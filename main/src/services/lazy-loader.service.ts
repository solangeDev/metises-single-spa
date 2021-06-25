import {Compiler, ComponentFactory, Injectable, InjectionToken, Injector, NgModuleFactory, Type} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export const BOOTSTRAP_COMPONENT = new InjectionToken<any>('BOOTSTRAP_COMPONENT');

@Injectable({
  providedIn: 'root'
})
export class LazyLoaderService {
  component$ = new BehaviorSubject<ComponentFactory<any> | null>(null);

  constructor(private compiler: Compiler, private injector: Injector) {
  }

  getComponentFactory(): Observable<ComponentFactory<any> | null> {
    return this.component$.asObservable();
  }

  loadModule(path: any) {
    (path() as Promise<NgModuleFactory<any> | Type<any>>)
      .then(elementModuleOrFactory => {
        if (elementModuleOrFactory instanceof NgModuleFactory) {
          // if ViewEngine
          return elementModuleOrFactory;
        } else {
          try {
            // if Ivy
            return this.compiler.compileModuleAsync(elementModuleOrFactory);
          } catch (err) {
            throw err;
          }
        }
      })
      .then(moduleFactory => {
        try {
          const moduleRef = moduleFactory.create(this.injector);
          const dynamicComponentType = moduleRef.injector.get(BOOTSTRAP_COMPONENT);
          const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory<any>(dynamicComponentType)

          this.component$.next(componentFactory);
        } catch (err) {
          throw err;
        }
      });
  }
}
