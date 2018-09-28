import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';



@Injectable()
export class PeopleProvider {

  constructor(private dbProvider: DatabaseProvider) { }

  public insert(people: People) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into people(name,email,phone,birthday,address,active) values (?,?,?,?,?,?)';
        let data = [people.name, people.email, people.phone, people.birthday, people.address, people.active ? 1 : 0];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(people: People) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update people set name = ?, email = ?, phone = ?,birthday =?,address=?, active = ?,where id = ?';
        let data = [people.name, people.email, people.phone, people.birthday, people.address, people.active ? 1 : 0];
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from people where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from people where id = ?';
        let data = [id];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let people = new People();
              people.id = item.id;
              people.name = item.name;
              people.email = item.email;
              people.phone = item.phone;
              people.birthday = item.birthday
              people.address = item.address;
              people.active = item.active;


              return people;
            }

            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getAllFilter(active: boolean, name: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM people p where p.active = ?';
        var data: any[] = [active ? 1 : 0];

        // filtrando pelo nome
        if (name) {
          sql += ' and p.name like ?'
          data.push('%' + name + '%');
        }

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let peoples: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var people = data.rows.item(i);
                peoples.push(people);
              }
              return peoples;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public getPeople() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT * FROM people';
        var data: any[] = [];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let peoples: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var people = data.rows.item(i);
                peoples.push(people);
              }
              return peoples;
            } else {
              return [];
            }
          })
          .catch((e) => console.error('Erro na busca', e));
      })
      .catch((e) => console.error(e));
  }

}
export class People {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: Date;
  address: string;
  active: boolean;

}
