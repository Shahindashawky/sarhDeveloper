import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = environment.apiUrl;
  httpOption: any;
  httpFileOption: any;
  token: any;
  auth = false;

  private authSubject = new BehaviorSubject<boolean>(false);
  authStatus = this.authSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
      const isAuth = !!this.token;
      this.authSubject.next(isAuth); 
    }

    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}` || '',
        Accept:'application/json' 
      }),
    };
    this.httpFileOption = {
       headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}` || '',
        Accept:'application/json'
       }),
    };
  }
  //auth
     setAuth(auth:boolean) {
    this.auth = auth;
    this.authSubject.next(auth);
    if (!auth) {
      localStorage.removeItem('token');
    }
  }
getAuth() {
  return this.authSubject.value;

}
  //GET
  getRegions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/regions`);
  }
  getProjectRegions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/project-regions`);
  }
  getRegionById(regionID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/regions/1/${regionID}`,
      {
        headers: this.httpFileOption.headers,
      });
  }
  getFacilite(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/facilities`);
  }
 getunitsProjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/projects`);
  }
  // getgetFaciliteById(feaID: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/dashboard/facilities/${feaID}`,
  //     {
  //       headers: this.httpFileOption.headers,
  //     });
  // }
  getProjectType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/project-types`);
  }
    getUnitsType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/unit-types`);
  }
  getProjectStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/project-status`);
  }
  getUnitsStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/unit-status`);
  }
  getProjectFacilities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/project-facilities`);
  }
  
  //POST

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data, {
      headers: this.httpOption.headers,
    });
  }
  resetPassword(rdata: any) {
    return this.http.post(`${this.apiUrl}/auth/change-password?locale=ar`, rdata, {
      headers: this.httpOption.headers,
    });
  }
  addRegion(newregion: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/dashboard/regions`,
      newregion,
      {
        headers: this.httpFileOption.headers
      }
    );
  }
  addRegionbyId(
    regionID: any,
    newregion: any
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/dashboard/regions/${regionID}`,
      JSON.stringify(newregion),
      {
        headers: this.httpOption.headers,
      }
    );
  }
  addFacilitie(newfacilitie: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/dashboard/facilities`,
      newfacilitie,
      {
       headers: this.httpFileOption.headers
      }
    );
  }

  // addFacilitiebyId(
  //   featureID: any,
  //   newfeature: any
  // ): Observable<any> {
  //   return this.http.post<any>(
  //     `${this.apiUrl}/dashboard/features/${featureID}`,
  //     JSON.stringify(newfeature),
  //     {
  //       headers: this.httpOption.headers,
  //     }
  //   );
  // }

    addProject(newproject: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/dashboard/projects`,
      newproject,
      {
       headers: this.httpFileOption.headers
      }
    );
  }
      addUnits(newunits: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/dashboard/units`,
      newunits,
      {
       headers: this.httpFileOption.headers
      }
    );
  }
  //Put
  updateregion(regionID: any, region: string) {
    return this.http.put<string>(
      `${this.apiUrl}/dashboard/regions/${regionID}`,
      { status },
      {
        headers: this.httpOption.headers,
      }
    );
  }
  updatestatusregion(stID: any, status: string) {
    return this.http.put<string>(
      `${this.apiUrl}/dashboard/regions/update-status/${stID}`,
      { status },
      {
        headers: this.httpOption.headers,
      }
    );
  }
  updatestatusfeature(stID: any, status: string) {
    return this.http.put<string>(
      `${this.apiUrl}/dashboard/features/update-status/${stID}`,
      { status },
      {
        headers: this.httpOption.headers,
      }
    );
  }
  //DELETE
  deleteregionById(rID: any) {
    return this.http.delete(`${this.apiUrl}/dashboard/regions/${rID}`,
      {
        headers: this.httpOption.headers,
      }
    );
  }
  deleteFeatureById(fID: any) {
    return this.http.delete(`${this.apiUrl}/dashboard/features/${fID}`,
      {
        headers: this.httpOption.headers,
      }
    );
  }
}
