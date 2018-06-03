import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from 'src/app/storefront-components/posts/posts.component';
import { PageComponent } from 'src/app/storefront-components/page/page.component';
import { PostComponent } from 'src/app/storefront-components/post/post.component';
import { ProductsComponent } from 'src/app/storefront-components/products/products.component';
import { ProductComponent } from 'src/app/storefront-components/product/product.component';
import { CartComponent } from 'src/app/storefront-components/cart/cart.component';
import { CheckoutShippingComponent } from 'src/app/storefront-components/checkout-shipping/checkout-shipping.component';
import { CheckoutBillingComponent } from 'src/app/storefront-components/checkout-billing/checkout-billing.component';
import { CheckoutPaymentComponent } from 'src/app/storefront-components/checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from 'src/app/storefront-components/checkout-review/checkout-review.component';
import { CheckoutConfirmationComponent } from 'src/app/storefront-components/checkout-confirmation/checkout-confirmation.component';
import { OrdersComponent } from 'src/app/storefront-components/orders/orders.component';
import { OrderComponent } from 'src/app/storefront-components/order/order.component';
import { ProductCategoryComponent } from 'src/app/storefront-components/product-category/product-category.component';
import { ProductCategoriesComponent } from 'src/app/storefront-components/product-categories/product-categories.component';
import { SearchResultsComponent } from 'src/app/storefront-components/search-results/search-results.component';
import { LoginComponent } from 'src/app/storefront-components/login/login.component';

const routes: Routes = [
  { path: '', component: ProductCategoriesComponent },
  { path: 'account',
    children: [
      {
        path: '',
        children: [
          { path: 'orders', component: OrdersComponent },
          { path: 'order/:key', component: OrderComponent },
        ]
      }
    ]
  },
  { path: 'checkout',
    children: [
      {
        path: '',
        children: [
          { path: 'shipping', component: CheckoutShippingComponent },
          { path: 'billing', component: CheckoutBillingComponent },
          { path: 'payment', component: CheckoutPaymentComponent },
          { path: 'review', component: CheckoutReviewComponent },
          { path: 'confirmation', component: CheckoutConfirmationComponent },
        ]
      }
    ]
  },
  { path: 'category/:slug', component: ProductCategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'page/:url', component: PageComponent },
  { path: 'product/:url', component: ProductComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'blog', component: PostsComponent },
  { path: 'blog/:url', component: PostComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'admin', loadChildren: 'src/app/admin/admin.module#AdminModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
