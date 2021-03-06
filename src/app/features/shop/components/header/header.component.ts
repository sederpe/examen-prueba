import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from '../../../../shared/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  route!: NavigationEnd;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe(value => this.route = value)

    // console.log(this.activatedRoute.snapshot.queryParamMap.get('test'));
  }

  redirectAbout(): void {
    this.router.navigateByUrl('/about');
    // this.router.navigate(['/about', 'detail']);
  }

  logout(): void {
    this.userService.destroy();
    this.router.navigateByUrl('/auth')
  }

}
