import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Region } from '../../model/Region';
import { Facilities } from '../../model/Facilities';
import { Project } from '../../model/Project';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  regionImage = "/images/dummyregion.png";
  facilityImage = "/icons/facility-management.png";
  projectImage = "/images/build2.jpg";
  unitImage = "/images/build3.png";
  facilityIcon = "/icons/facility-management.png";

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
        Accept: 'application/json'
      }),
    };
    this.httpFileOption = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}` || '',
        Accept: 'application/json'
      }),
    };
  }
  //auth
  setAuth(auth: boolean) {
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
  getRegionswithlang(lang: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/regions?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });;
  }
  getRegionsexcept(regionId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/regions?exclude_id=${regionId}`);
  }
  getALLRegions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/regions`,
      {
        headers: this.httpOption.headers,
      });
  }
  getALLFacilitie(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/facilities`,
      {
        headers: this.httpOption.headers,
      });
  }
  getALLProjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/projects`,
      {
        headers: this.httpOption.headers,
      });
  }
  getProjectById(projectID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/projects/${projectID}`,
      {
        headers: this.httpFileOption.headers,
      });
  }
  getALLUnits(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/units`,
      {
        headers: this.httpOption.headers,
      });
  }
  getUnitById(unitID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/units/${unitID}`,
      {
        headers: this.httpFileOption.headers,
      });
  }
  getProjectRegions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/project-regions`);
  }
  getRegionById(regionID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/regions/${regionID}`,
      {
        headers: this.httpFileOption.headers,
      });
  }
  getFacilite(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/facilities`);
  }
  getFaciliteById(faciliteID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/facilities/${faciliteID}`,
      {
        headers: this.httpFileOption.headers,
      });
  }
  getunitsProjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/projects`);
  }
  getProjectType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/project-types`);
  }
  getProjectTypewithlang(lang: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/project-types?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });;
  }
  getUnitsType(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/unit-types`);
  }
  getUnitsTypewithlang(lang: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/unit-types?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
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
  getconstructionUpdateProject(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/projects`);
  }
  getconstructionUpdatestatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/helpers/construction-status`);
  }
  getALLConstructions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/constructions`,
      {
        headers: this.httpOption.headers,
      });
  }
  getConstructionById(constID: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/constructions/${constID}`,
      {
        headers: this.httpFileOption.headers,
      });
  }

  getProjectList(lang: any) {
    return this.http.get<any>(`${this.apiUrl}/project-list?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
  }
  getRegionDetails(rid: any, lang: any) {
    return this.http.get<any>(`${this.apiUrl}/region-details/${rid}/?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
  }
  getProjectDetails(pid: any, lang: any) {
    return this.http.get<any>(`${this.apiUrl}/project-details/${pid}/?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
  }
  getProjectUnits(pid: any, lang: any, typeid: any) {
    return this.http.get<any>(`${this.apiUrl}/project-units/${pid}/?locale=${lang}&unit_type_id=${typeid}`,
      {
        headers: this.httpOption.headers,
      });
  }
  getpreviouslist(lang: any) {
    return this.http.get<any>(`${this.apiUrl}/previous-list/?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
  }
  getConstructionUpdate(lang: any) {
    return this.http.get<any>(`${this.apiUrl}/construction-update/?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
  }
  getConstructionDetailsById(cid: any, lang: any) {
    return this.http.get<any>(`${this.apiUrl}/construction-update/${cid}/?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
  }
  getConstructionDatesById(pid: any, lang: any) {
    return this.http.get<any>(`${this.apiUrl}/construction-dates/${pid}/?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
  }
  getProjectUnitById(uid: any, lang: any) {
    return this.http.get<any>(`${this.apiUrl}/unit-details/${uid}/?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
  }
  getlastUnit(lang: any) {
    return this.http.get<any>(`${this.apiUrl}/last-unit/?locale=${lang}`,
      {
        headers: this.httpOption.headers,
      });
  }
  //POST

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data, {
      headers: this.httpOption.headers,
    });
  }
  resetPassword(rdata: any) {
    return this.http.post(`${this.apiUrl}/auth/change-password`, rdata, {
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
  addConstructionUpdate(newconst: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/dashboard/constructions`,
      newconst,
      {
        headers: this.httpFileOption.headers
      }
    );
  }
  search(lang: any,search:any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/search?locale=${lang}`,
      {},

      { params: search,
        headers: this.httpOption.headers,
      }
    );
  }
  sendContact(lang: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/send-contact?locale=${lang}`,

      {
        headers: this.httpOption.headers,
      }
    );
  }
  //Put
  updateRegion(regionID: any, region: Region) {
    return this.http.post(
      `${this.apiUrl}/dashboard/regions/${regionID}?_method=PUT`,
      region,
      this.httpFileOption
    );
  }
  updateFacilitie(facilitieID: any, facilitie: Facilities) {
    return this.http.post(
      `${this.apiUrl}/dashboard/facilities/${facilitieID}?_method=PUT`,
      facilitie,
      this.httpFileOption
    );
  }
  updateProject(projectID: any, project: Project) {
    return this.http.post(
      `${this.apiUrl}/dashboard/projects/${projectID}?_method=PUT`,
      project,
      this.httpFileOption
    );
  }
  updateunit(unitID: any, unit: any) {
    return this.http.post(
      `${this.apiUrl}/dashboard/units/${unitID}?_method=PUT`,
      unit,
      this.httpFileOption
    );
  }
  updateconstruction(constID: any, construction: any) {
    return this.http.post(
      `${this.apiUrl}/dashboard/constructions/${constID}?_method=PUT`,
      construction,
      this.httpFileOption
    );
  }
  updateregionStatus(regionstatus: any) {
    return this.http.put(
      `${this.apiUrl}/dashboard/regions/update-status/${regionstatus}`,
      {},
      {
        headers: this.httpOption.headers,
      }
    );
  }
  updatefacilitieStatus(facilitiestatus: any) {
    return this.http.put(
      `${this.apiUrl}/dashboard/facilities/update-status/${facilitiestatus}`,
      {},
      {
        headers: this.httpOption.headers,
      }
    );
  }
  updateprojectStatus(projectstatus: any) {
    return this.http.put(
      `${this.apiUrl}/dashboard/projects/update-status/${projectstatus}`,
      {},
      {
        headers: this.httpOption.headers,
      }
    );
  }
  updateunitStatus(unitstatus: any) {
    return this.http.put(
      `${this.apiUrl}/dashboard/units/update-status/${unitstatus}`,
      {},
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
  deleteFacilitieById(fID: any) {
    return this.http.delete(`${this.apiUrl}/dashboard/facilities/${fID}`,
      {
        headers: this.httpOption.headers,
      }
    );
  }
  deleteProjectById(pID: any) {
    return this.http.delete(`${this.apiUrl}/dashboard/projects/${pID}`,
      {
        headers: this.httpOption.headers,
      }
    );
  }
  deleteUnitById(uID: any) {
    return this.http.delete(`${this.apiUrl}/dashboard/units/${uID}`,
      {
        headers: this.httpOption.headers,
      }
    );
  }
  deleteConstructionById(cID: any) {
    return this.http.delete(`${this.apiUrl}/dashboard/constructions/${cID}`,
      {
        headers: this.httpOption.headers,
      }
    );
  }
}
