# Angular

# What is Angular?

Angular is a TypeScript-based, open source frontend web application framework developed by Google. Angular is used to create Single Page Applications (SPA) and is preferred in large and scalable projects with its component-based structure.

## Table of Contents
1. [Installing Angular](#installing-angular)
2. [Angular Project Structure](#angular-project-structure)
3. [Component](#component)
4. [Routing](#routing)
5. [Services](#services)
6. [HTTP Requests](#http-requests)
7. [Lifecycle Hooks](#lifecycle-hooks)
8. [Pipes](#pipes)

# Main Features:
- Component-based architecture: Organises the application into reusable components.
- Two-way data binding: Provides bidirectional data flow between model and view.
- Dependency Injection (DI): Applies the principle of injecting the dependencies that a class needs from outside.
- Directives: It is used to give additional functions to HTML elements.
- Routing: Allows navigation between pages in Angular. 

## Installing Angular

Node.js and npm (or yarn): You will need these tools to create and manage your project. You can download and install Node.js from the official website (https://nodejs.org/).

## Install Angular CLI (Command Line Interface):

To create and manage your Angular project, you need to install the Angular CLI globally. You can do this using the command below:

```bash
npm install -g @angular/cli
``````` 

## Create a new Angular project:

```bash
ng new my-app
``````` 
This command will create a folder named my-app, a new Angular project.

## Start the local server:

```bash
cd my-app
ng serve
``````` 
This command will launch your application on a local server and open it automatically in your browser. You can see your application by visiting http://localhost:4200.

# Angular Project Structure

src/ (Main folder):
app/: Components, modules, services of the application
assets/: Fixed files (images, style files)
environments/: Different environments (development, production)
angular.json: Angular project configuration file
package.json: Project dependent libraries and scripts
tsconfig.json: TypeScript configuration file


## Component

Angular Component: The basic building block of an application in Angular. A component is an independent module consisting of an HTML template, CSS styles, and a TypeScript class. These components form the user interface of the application, and each component represents a specific part of the application.

```bash
ng generate component my-component  // or ng g c my-component
``````` 

Here’s a simple explanation for the my-component.component.ts file:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import commonly needed Angular features
import { RouterModule } from '@angular/router'; // For routing capabilities

@Component({
  selector: 'app-my-component', // Selector for the component
  standalone: true, // Indicating that this is a standalone component
  templateUrl: './my-component.component.html', // Path to the HTML template
  styleUrls: ['./my-component.component.css'], // Path to the CSS styles
  imports: [CommonModule, RouterModule] // Importing necessary modules directly
})
export class MyComponent {
  title = 'My Angular Component'; 
}
``````` 
## Routing 

Angular Routing is a mechanism that provides transition between pages in Angular applications. In Angular applications that are Single Page Applications (SPA), when the user clicks on different URLs, the content is changed without reloading the page. This provides a fluid experience to the user with in-page redirects.

Example Routing 

```typescript
import { Routes, provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';  // Used for standalone component imports
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

// Define your routes
const routes: Routes = [
  { path: 'home', component: HomeComponent },  // Home page route
  { path: 'about', component: AboutComponent }, // About page route
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route to Home
];

export const appRoutingProviders = [
  provideRouter(routes)  
];
``````` 
## Services

An Angular service is a class that provides reusable logic, data access, or utility functions that can be shared across different components of the application. Services help keep your components clean and focused on the UI, by offloading business logic and data handling into dedicated classes.

```bash
ng generate service my-service // ng g s my-service
``````` 
Example Service:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes the service available throughout the app without needing to add it to providers.
})
export class MyService {

  constructor() { }

  // Example method that returns a greeting message
  getGreeting(): string {
    return 'Hello from MyService!';
  }
}
``````` 
Using the Service in a Component:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-component', 
  standalone: true, 
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'], 
  imports: [CommonModule, RouterModule] 
})
export class MyComponent {
  title = 'My Angular Component'; 
  greetingMessage: string = '';

  constructor(private myService: MyService) { // Injecting the service

    // Using the service method to get a greeting message
    this.greetingMessage = this.myService.getGreeting();
  }
}
``````` 
### HTTP Requests

#### 1-Adding HttpClientModule Module to the Project

To use HTTP requests, you must first include the HttpClientModule in your project. If you are using standalone components, you can add this module to the component or, in the example, you can add it as a project global in the app.config section.

Example: Adding HttpClientModule to app.config

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Import HttpClient provider

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),  // Provides routing configuration
    provideClientHydration(),  // Enables client hydration
    provideHttpClient()  // Provides HTTP client functionalities globally
  ]
};
``````` 
#### 2-Creating a Service for HTTP Requests

You can use a service to get data from the server and share this data between components. In this example, we will create a DataService.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  // GET Request
  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // POST Request
  createPost(post: any): Observable<any> {
    return this.http.post(this.apiUrl, post);
  }

  // PUT Request
  updatePost(post: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${post.id}`, post);
  }

  // DELETE Request
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
``````` 
#### 3-Using HTTP Requests in Component

You can make HTTP requests using the service you created in the component.

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  createPost() {
    const newPost = { title: 'New Post', body: 'Post Content' };
    this.dataService.createPost(newPost).subscribe((data) => {
      this.posts.push(data);
    });
  }

  updatePost(post: any) {
    this.dataService.updatePost(post).subscribe((updatedPost) => {
      const index = this.posts.findIndex((p) => p.id === post.id);
      this.posts[index] = updatedPost;
    });
  }

  deletePost(postId: number) {
    this.dataService.deletePost(postId).subscribe(() => {
      this.posts = this.posts.filter((p) => p.id !== postId);
    });
  }
}
``````` 
#### 4-Error Handling with HttpClient

```typescript
import { catchError, throwError } from 'rxjs';

getPosts(): Observable<any> {
  return this.http.get(this.apiUrl).pipe(
    catchError((error) => {
      console.error('Error occurred:', error);
      return throwError(() => new Error('Error fetching posts'));
    })
  );
}
``````` 
#### 5-Using with Headers in HTTP Requests

In some cases, it may be necessary to send authentication information to APIs. This is done using HttpHeaders:

```typescript
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  Authorization: 'Bearer YOUR_TOKEN'
});

this.http.get(this.apiUrl, { headers }).subscribe((data) => {
  console.log(data);
});
``````` 
#### 6-HTTP Requests with JSON Web Token (JWT)

JWT-based authentication is widely used with Angular. The token is added to the headers of the HTTP request and sent to the server.

```typescript
const token = 'your-jwt-token';
const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

this.http.get(this.apiUrl, { headers }).subscribe((response) => {
  console.log('Data:', response);
});
``````` 
## Lifecycle Hooks

Angular components trigger various events at certain stages of their lifecycle. Components are loaded, updated and destroyed at different stages.
Main Lifecycle Hooks:
- ngOnInit: Runs when the component is initialised.
- ngOnChanges: Fires when the input to the component changes.
- ngOnDestroy: Fires just before the component is destroyed.
```typescript
export class MyComponent implements OnInit, OnDestroy {
  ngOnInit() {
    console.log('Component initialized');
  }

  ngOnDestroy() {
    console.log('Component is being destroyed');
  }
}
```````
## Pipes 

In Angular, pipes are used to format data within a template. For example, they can be used to format dates, numbers, or text. There are many predefined pipes in Angular, and you can also create your own custom pipes.
Example: Predefined Pipes
```typescript
<p>{{ today | date: 'longDate' }}</p>
<p>{{ price | currency: 'TRY' }}</p>
```````
Custom Pipe Creation:
```bash
ng generate pipe my-custom-pipe
```````
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
```````
