import {
  child,
  Database,
  DatabaseReference,
  get,
  onValue,
  ref,
  Unsubscribe,
  set,
} from "firebase/database";

export enum FirebaseObjectsEnum {
  Schedule = "schedule",
  OrderWindow = "orderWindow",
}

export class FirebaseObject<T extends Record<string, any>> {
  private objectRef: DatabaseReference;
  private dbRef: DatabaseReference;
  private _object?: T;
  constructor(db: Database, private objectName: FirebaseObjectsEnum) {
    this.dbRef = ref(db);
    this.objectRef = child(this.dbRef, objectName);
  }

  get value(): T | undefined {
    if (this._object) {
      return this._object;
    }
    // throw new Error(
    //   `Firebase object ${this.objectName} was referenced before it was loaded. Call the load() method before.`
    // );
  }

  async load(): Promise<void> {
    this._object = (await get(this.objectRef)).val();
  }

  async get(): Promise<T> {
    return (await get(this.objectRef)).val();
  }

  async set(value: T): Promise<void> {
    await set(this.objectRef, value);
    this._object = value;
  }

  async setProperty(propName: keyof T, value: any) {
    const propRef = child(
      this.dbRef,
      `${this.objectName}/${propName?.toString()}`
    );
    await set(propRef, value);
    if (this._object) {
      this._object[propName] = value;
    }
  }

  onValue(cb: (item: T, key: string) => void): Unsubscribe {
    return onValue(this.objectRef, (snapshot) => {
      cb(snapshot.val(), snapshot.key!);
    });
  }
}
