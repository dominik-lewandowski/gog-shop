import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gog-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavComponent {
}
