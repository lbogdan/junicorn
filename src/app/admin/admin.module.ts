import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'firebase/storage';
// import * as firebase from 'firebase';

import { MaterialComponentsModule } from '../materialcomponents.module';
import { SharedModule } from '../shared.module';

import { CKEditorModule } from 'ng2-ckeditor';
import { DndModule } from 'ng2-dnd';

import { AdminComponent } from '../admin/admin-components/admin/admin.component';
import { AddPostComponent } from '../admin/admin-components/add-post/add-post.component';
import { AdminPostsComponent } from '../admin/admin-components/admin-posts/admin-posts.component';
import { AdminAdminsComponent } from '../admin/admin-components/admin-admins/admin-admins.component';
import { AdminDashboardComponent } from '../admin/admin-components/admin-dashboard/admin-dashboard.component';
import { AddAdminComponent } from '../admin/admin-components/add-admin/add-admin.component';
import { AdminPagesComponent } from '../admin/admin-components/admin-pages/admin-pages.component';
import { AddPageComponent } from '../admin/admin-components/add-page/add-page.component';
import { AdminMenusComponent } from '../admin/admin-components/admin-menus/admin-menus.component';
import { AdminThemeComponent } from '../admin/admin-components/admin-theme/admin-theme.component';
import { AdminProductsComponent } from '../admin/admin-components/admin-products/admin-products.component';
import { AddProductComponent } from '../admin/admin-components/add-product/add-product.component';
import { DeleteDialogComponent } from '../admin/admin-components/delete-dialog/delete-dialog.component';
import { AdminCustomersComponent } from '../admin/admin-components/admin-customers/admin-customers.component';
import { AddOrderComponent } from '../admin/admin-components/add-order/add-order.component';
import { AddCustomerComponent } from '../admin/admin-components/add-customer/add-customer.component';
import { AdminOrdersComponent } from '../admin/admin-components/admin-orders/admin-orders.component';
import { AdminProductCategoriesComponent } from '../admin/admin-components/admin-product-categories/admin-product-categories.component';
import { AddProductCategoryComponent } from '../admin/admin-components/add-product-category/add-product-category.component';
import { AdminApprovalsComponent } from '../admin/admin-components/admin-approvals/admin-approvals.component';
import { ApproveDialogComponent } from '../admin/admin-components/approve-dialog/approve-dialog.component';

import { AuthGuard } from 'src/app/services/auth.guard';
import { SuperAdminGuard } from 'src/app/services/super-admin.guard';
import { AdminGuard } from 'src/app/services/admin.guard';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MaterialComponentsModule,
    SharedModule,
    CKEditorModule,
    DndModule.forRoot(),
  ],
  declarations: [
    AddAdminComponent,
    AddCustomerComponent,
    AddPostComponent,
    AddPageComponent,
    AddOrderComponent,
    AddProductComponent,
    AddProductCategoryComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminAdminsComponent,
    AdminApprovalsComponent,
    AdminCustomersComponent,
    AdminMenusComponent,
    AdminOrdersComponent,
    AdminPagesComponent,
    AdminPostsComponent,
    AdminProductCategoriesComponent,
    AdminProductsComponent,
    AdminThemeComponent,
    DeleteDialogComponent,
    ApproveDialogComponent,
  ],
  providers: [AuthGuard, SuperAdminGuard, AdminGuard],
  entryComponents: [DeleteDialogComponent, ApproveDialogComponent],
})
export class AdminModule { }
