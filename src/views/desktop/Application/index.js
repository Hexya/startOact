import * as pages from 'core/pages'
import { autobind } from 'core-decorators'
import HomeView from 'views/desktop/Home'
import ProjectView from 'views/desktop/Project'

export default class DesktopAppView {

  // Setup ---------------------------------------------------------------------

  constructor() {
    console.info('desktop application initializing')
    this.el = document.getElementById('application')

    this._views = []
    this._home = this._setupHome()
    this._project = this._setupProject()

    this._views.push(this._home)

    this._setupEvents()
  }

  _setupHome() {
    const view = new HomeView({
      parent: this.el,
    })

    return view
  }
  _setupProject() {
      const view = new ProjectView({
          parent: this.el,
      })

      return view
  }

  _setupEvents() {
    window.addEventListener('resize', this._onResize)
    window.addEventListener('scroll', this._onScroll)
    window.addEventListener('mousewheel', this._onScrollWheel)
    window.addEventListener('DOMMouseScroll', this._onScrollWheel)

    this._onResize()
  }

  // State ---------------------------------------------------------------------
  start() {}

  // Events --------------------------------------------------------------------

  updatePage(page) {

    switch (page) {
      case pages.HOME:
        this._project.hide()
        this._home.show()
        break;
      case pages.PROJECT:
          this._project.show()
          this._home.hide()
          break;
      default:
        this._home.hide()
    }
  }

  @autobind
  _onResize() {
    Signals.onResize.dispatch( window.innerWidth, window.innerHeight )
  }

  @autobind
  _onScroll() {
    Signals.onScroll.dispatch()
  }

  @autobind
  _onScrollWheel() {
    Signals.onScrollWheel.dispatch()
  }

  // Update ------
  update() {
    this._home.update()
  }
}
