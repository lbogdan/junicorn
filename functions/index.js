'use strict';

const functions = require('firebase-functions'),
  admin = require('firebase-admin'),
  logging = require('@google-cloud/logging')();

admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.token),
  currency = functions.config().stripe.currency || 'USD';

exports.createStripeCharge = functions.database.ref('/stripe_customers/{userId}/charges/{id}').onWrite(event => {
  const val = event.data.val();
  if (val === null || val.id || val.error) return null;
  return admin.database().ref(`/stripe_customers/${event.params.userId}/customer_id`).once('value').then(snapshot => {
    return snapshot.val();
  }).then(customer => {
    const amount = val.amount;
    const idempotency_key = event.params.id;
    let charge = {amount, currency, customer};
    if (val.source !== null) charge.source = val.source;
    return stripe.charges.create(charge, {idempotency_key});
  }).then(response => {
      return event.data.adminRef.set(response);
    }, error => {
      return event.data.adminRef.child('error').set(userFacingMessage(error)).then(() => {
        return reportError(error, {user: event.params.userId});
      });
    }
  );
});

exports.createTheStripeCustomer = functions.auth.user().onCreate(event => {
  const data = event.data;
  return stripe.customers.create({
    email: data.email
  }).then(customer => {
    return admin.database().ref(`/stripe_customers/${data.uid}/customer_id`).set(customer.id);
  });
});

exports.addPaymentSource = functions.database.ref('/stripe_customers/{userId}/sources/{pushId}/token').onWrite(event => {
  const source = event.data.val();
  if (source === null) return null;
  return admin.database().ref(`/stripe_customers/${event.params.userId}/customer_id`).once('value').then(snapshot => {
    return snapshot.val();
  }).then(customer => {
    return stripe.customers.createSource(customer, {source});
  }).then(response => {
    return event.data.adminRef.parent.set(response);
  }, error => {
    return event.data.adminRef.parent.child('error').set(userFacingMessage(error)).then(() => {
      return reportError(error, {user: event.params.userId});
    });
  });
});

exports.cleanupUser = functions.auth.user().onDelete(event => {
  return admin.database().ref(`/stripe_customers/${event.data.uid}`).once('value').then(snapshot => {
    return snapshot.val();
  }).then(customer => {
    return stripe.customers.del(customer);
  }).then(() => {
    return admin.database().ref(`/stripe_customers/${event.data.uid}`).remove();
  });
});

function reportError(err, context = {}) {
  const logName = 'errors';
  const log = logging.log(logName);

  const metadata = {
    resource: {
      type: 'cloud_function',
      labels: {function_name: process.env.FUNCTION_NAME}
    }
  };

  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: 'cloud_function'
    },
    context: context
  };

  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}


function userFacingMessage(error) {
  return error.type ? error.message : 'An error occurred, developers have been alerted';
}

const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
  `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendEmailConfirmation = functions.database.ref('/admins/{id}').onWrite(event => {
  const snapshot = event.data;
  const val = snapshot.val();

  if (!snapshot.changed('active')) {
    return;
  }

  const mailOptions = {
    from: '"Junicorn Crafts" <noreply@firebase.com>',
    to: val.email
  };

  if (!val.active) {
    mailOptions.subject = 'Admin Confirmation';
    mailOptions.html = '<h2>Junicorn Crafts</h2>You have been added as an admin to Junicorn Crafts. <br><br>Sign in now: https://' + process.env.GCLOUD_PROJECT + '.firebaseapp.com/register';
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New admin confirmation email sent to:', val.email);
    }).catch(error => {
      console.error('There was an error while sending the email:', error);
    });
  }
});

exports.sendOrderConfirmation = functions.database.ref('/users/{uid}/orders/{orderId}').onCreate(event => {
  const snapshot = event.data;
  return event.data.ref.parent.parent.once("value").then(snap => {
    const user = snap.val();
    const email = user.email;

    if (email) {
      const mailOptions = {
        from: '"Junicorn Crafts" <tejugkrishna@gmail.com>',
        to: email
      };
      mailOptions.subject = 'Order Confirmation';
      mailOptions.html = '<h2>Junicorn Crafts</h2>Order #' + event.params.orderId + '. This is a confirmation email for you order on Junicorn Crafts. <br><br>';
      mailOptions.html += 'View order details and status by logging in: https://' + process.env.GCLOUD_PROJECT + '.firebaseapp.com/account/order/' + event.params.orderId;
      return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New order confirmation email sent to:', email);
      }).catch(error => {
        console.error('There was an error while sending the email:', error);
      });
    }
  });

});
