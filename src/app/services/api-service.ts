import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = environment.apiUrl;
  httpOption: any;
  httpFileOption: any;
  token: any;
  auth = false;


  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}` || '',
      }),
    };
    this.httpFileOption = {
      headers: new HttpHeaders({
        Authorization: this.token || '',
      }),
    };
  }
  //GET
  getRegions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/regions`);
  }

  getRegionById(regionID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/regions/1/${regionID}`,
      {
        headers: this.httpFileOption.headers,
      });
  }
  getFeatures(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/features`);
  }

  getFeatureById(feaID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/features/${feaID}`,
      {
        headers: this.httpFileOption.headers,
      });
  }
  getProjectTypeEn(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auto-complete/project-types?locale=en`);
  }
  getRegionsEn(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auto-complete/regions?locale=en`);
  }
  getFeaturesEn(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auto-complete/features?locale=en`);
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
        headers: this.httpFileOption.headers,
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
  addFeature(newfeature: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/dashboard/features`,
      newfeature,
      {
        headers: this.httpFileOption.headers,
      }
    );
  }
  addFeaturebyId(
    featureID: any,
    newfeature: any
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/dashboard/features/${featureID}`,
      JSON.stringify(newfeature),
      {
        headers: this.httpOption.headers,
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
