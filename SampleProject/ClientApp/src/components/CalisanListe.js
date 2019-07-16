import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';


export class CalisanListe extends Component{
    constructor() {
        super();
        this.state = { empList: [], loading: true };

        fetch('api/Calisan/GetAll')
            .then(response => response.json())
            .then(data => {
                this.setState({ empList: data, loading: false });
            }); 

         
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

     render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCalisanTablo(this.state.empList);

        return <div>
            <h1>Çalışanlar Listesi</h1>
            <p className="btn btn-default">
                <Link to="/CalisanEkle">Çalışan Ekle</Link>
            </p>
            {contents}
        </div>;
    }

    
     handleDelete(id: number) {
     
            fetch('api/Calisan/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        empList: this.state.empList.filter((rec) => {
                            return (rec.id !== id);
                        })
                    });
            });
        
    }

     handleEdit(id: number) {
        this.props.history.push("/CalisanEkle/Edit/" + id);
    }



    // render edilirken oluşacak tablo 
     renderCalisanTablo(empList: CalisanData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Ad</th>
                    <th>Cinsiyet</th>
                    <th>Departman</th>
                    <th>Sehir</th>
                </tr>
            </thead>
            <tbody>
                {empList.map(emp =>
                    <tr key={emp.id}>
                        <td></td>
                        <td>{emp.id}</td>
                        <td>{emp.ad}</td>
                        <td>{emp.cinsiyet}</td>
                        <td>{emp.departman}</td>
                        <td>{emp.sehir}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.id)}>Güncelle</a>  ||
                            <a className="action" onClick={(id) => this.handleDelete(emp.id)}>Sil</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class CalisanData {
    id: number = 0;
    ad: string = "";
    cinsiyet: string = "";
    sehir: string = "";
    departman: string = "";
}    