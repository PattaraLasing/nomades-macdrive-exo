import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

export interface OrderDataInterface {
  createAt: string;
  recipes: {
    uuid: string;
    title: string;
    price: number;
    count: number;
  }[];
  uid: string;
  _id: string;
}

@Injectable({
  providedIn: 'root',
})
export class FireService {

  private readonly _cloudStorage = inject(Firestore);
  private readonly _auth = inject(Auth);
  
  async saveOrder(data: Omit<OrderDataInterface, '_id' | 'uid'>){
    const user = await firstValueFrom(authState(this._auth));
    const colRef = collection(this._cloudStorage, `macdrive-orders`);
    const result = await addDoc(colRef, {...data, uid: user?.uid});
    return result;
  }
}
