import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostResolver } from './core/resolvers/post.resolver';
import { PostComponent } from './post.component';

const routes: Routes = [
  {
    path: 'api/:alias',
    component: PostComponent,
    resolve: {
      post: PostResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
