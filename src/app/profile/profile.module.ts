import { NgModule } from '@angular/core';
import { ShareModule } from 'app/shared/share.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [ProfileRoutingModule, ShareModule],
})
export class ProfileModule {}
