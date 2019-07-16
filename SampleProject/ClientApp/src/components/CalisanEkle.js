
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { CalisanListe, CalisanData } from './CalisanListe';



export class CalisanEkle extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, empData: new CalisanData };

        // eğer varsa datanın id sini burada alıp güncelleme işleminde kullanıyoruz.
        var empid = this.props.match.params["id"];

         // burada state i güncellemeye ayarlıyoruz
        if (empid > 0) {
            fetch('api/Calisan/Details/' + empid)
                .then(response => response.json())
                .then(data => {
                    this.setState({ title: "Güncelle", loading: false, empData: data });
                });
        }

        // burada state i eklemeye ayarlıyoruz.
        else {
            this.state = { title: "Ekle", loading: false, empData: new CalisanData };
        }

        // Bu kısımda fonksiyonları bind ediyoruz.
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Çalışan Bilgileri</h3>
            <hr />
            {contents}
        </div>;
    }

    // Submit işlemi yapmak icin gerekli fonksyion
     handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // çalışan put  
        if (this.state.empData.id) {
            fetch('api/Calisan/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/CalisanListe");
                })
        }

        // çalışan post
        else {
            fetch('api/Calisan/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/CalisanListe");
                })
        }
    }

    
     handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/CalisanListe");
    }

        
     renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.empData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Ad">Ad-Soyad</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Ad" defaultValue={this.state.empData.ad} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Cinsiyet">Cinsiyet</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="Cinsiyet" defaultValue={this.state.empData.cinsiyet} required>
                            <option value="">-- Cinsiyet Seç --</option>
                            <option value="Erkek">Erkek</option>
                            <option value="Kadın">Kadın</option>
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Departman" >Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Departman" defaultValue={this.state.empData.departman} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Sehir">Şehir</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Sehir" defaultValue={this.state.empData.sehir} required />
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Kaydet</button>
                    <button className="btn" onClick={this.handleCancel}>Geri</button>
                </div >
            </form >
        )
    }
}  