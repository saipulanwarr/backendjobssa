'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});

Route.group(() => {
  Route.post('register', 'AuthController.register').as('registerJwt')
  Route.post('login', 'AuthController.login').as('loginJwt')
  Route.post('refresh', 'AuthController.refreshToken').as('refreshTokenJwt').middleware(['auth:jwt'])
  Route.post('logout', 'AuthController.logout').as('loginJwt').middleware(['auth:jwt'])
  Route.get('profile', 'AuthController.profile').as('profileJwt').middleware(['auth:jwt'])

  Route.patch('user/:id', 'UserController.update')
  Route.get('user/:id', 'UserController.index')

  Route.post('education', 'EducationController.store');
  Route.get('education/:id', 'EducationController.index');
  Route.patch('education/:id', 'EducationController.update');
  Route.delete('education/:id', 'EducationController.delete');

  Route.post('experience', 'ExperienceController.store');
  Route.get('experience/:id', 'ExperienceController.index');
  Route.patch('experience/:id', 'ExperienceController.update');
  Route.delete('experience/:id', 'ExperienceController.delete');

  Route.get('job', 'JobController.index');
  
  Route.get('favorite/:id', 'FavoriteController.index');
  Route.post('favorite', 'FavoriteController.store');
  Route.get('countfavorite/:id', 'FavoriteController.countfavorite');

  Route.post('applicant', 'ApplicantController.store');
  Route.get('applicant', 'ApplicantController.index');
  Route.patch('applicant/:id', 'ApplicantController.update');
  Route.delete('applicant/:id', 'ApplicantController.delete');
  Route.get('countuser/:id', 'ApplicantController.countuser');
  
}).prefix('api/v1')
 