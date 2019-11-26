import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { GithubRouterModule } from './github-routing.module'
import { HrApplicationModule } from 'src/app/components/HrApplicationComponents/hrapplication.module'
import { FormsModule } from '@angular/forms'
import { QuillModule } from 'ngx-quill'
// github
import { GithubDiscussComponent } from 'src/app/pages/github/discuss/discuss.component'
import { GithubExploreComponent } from 'src/app/pages/github/explore/explore.component'

const COMPONENTS = [GithubDiscussComponent, GithubExploreComponent]

@NgModule({
  imports: [SharedModule, GithubRouterModule, FormsModule, HrApplicationModule, QuillModule],
  declarations: [...COMPONENTS],
})
export class GithubModule {}