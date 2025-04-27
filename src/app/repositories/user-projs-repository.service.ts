import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpUserProj } from '../interface/IDpUserProj';
import { DpUserProjsService } from '../services/dp-user-projs.service';

@Injectable({
  providedIn: 'root'
})
export class UserProjsRepositoryService {
  constructor(private dpUserProjsService: DpUserProjsService) {}

  getAllDpUserProjs(): Observable<IDpUserProj[]> {
    return this.dpUserProjsService.getAllDpUserProjs();
  }

  getDpUserProjById(id: number): Observable<IDpUserProj> {
    return this.dpUserProjsService.getDpUserProjById(id);
  }

  createDpUserProj(dpUserProj: IDpUserProj): Observable<IDpUserProj> {
    return this.dpUserProjsService.createDpUserProj(dpUserProj);
  }

  updateDpUserProj(id: number, dpUserProj: IDpUserProj): Observable<void> {
    return this.dpUserProjsService.updateDpUserProj(id, dpUserProj);
  }

  deleteDpUserProj(id: number): Observable<void> {
    return this.dpUserProjsService.deleteDpUserProj(id);
  }
}
