import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { YoutubeRouterModule } from './youtube-routing.module'
import { HrApplicationModule } from 'src/app/components/HrApplicationComponents/hrapplication.module'

// youtube
import { YoutubeFeedComponent } from 'src/app/pages/youtube/feed/feed.component'
import { YoutubeViewComponent } from 'src/app/pages/youtube/view/view.component'

const COMPONENTS = [YoutubeFeedComponent, YoutubeViewComponent]

@NgModule({
  imports: [SharedModule, YoutubeRouterModule, HrApplicationModule],
  declarations: [...COMPONENTS],
})
export class YoutubeModule {}
