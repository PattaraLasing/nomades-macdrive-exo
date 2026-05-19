import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { OrderDataInterface } from '../../interfaces/interfaces';

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

  loadOrder() {
    const colRef = collection(this._cloudStorage, `macdrive-orders`)
    const data = collectionData(colRef, {idField: '_id'}) as Observable<OrderDataInterface[]>;
    return data;
  }

  async getOrderById(id: string) {
    const docRef = doc(this._cloudStorage, `macdrive-orders/${id}`);
    const result = await getDoc(docRef);
    const data = result.data() as Omit<OrderDataInterface, '_id'>;
    return {...data, _id: result.id};
  }
}
