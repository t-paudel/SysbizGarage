import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { BlogRouterModule } from './blog-routing.module'
import { HrApplicationModule } from 'src/app/components/HrApplicationComponents/hrapplication.module'
import { QuillModule } from 'ngx-quill'

// blog
import { BlogAddBlogPostComponent } from 'src/app/pages/blog/add-blog-post/add-blog-post.component'
import { BlogFeedComponent } from 'src/app/pages/blog/feed/feed.component'
import { BlogPostComponent } from 'src/app/pages/blog/post/post.component'

const COMPONENTS = [BlogAddBlogPostComponent, BlogFeedComponent, BlogPostComponent]

@NgModule({
  imports: [SharedModule, BlogRouterModule, HrApplicationModule, QuillModule],
  declarations: [...COMPONENTS],
})
export class BlogModule {}
