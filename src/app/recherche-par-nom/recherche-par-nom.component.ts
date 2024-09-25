import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit.model';
import { apiURL } from '../config';
import { ProduitService } from '../services/produit.service';
import { HttpClient } from '@angular/common/http';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [],
})
export class RechercheParNomComponent implements OnInit {
  nomProduit!: string;
  produits!: Produit[];
  allProduits: Produit[] = [];
  searchTerm!: string;

  constructor(
    private produitService: ProduitService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.produitService.listeProduit().subscribe((prods) => {
      console.log(prods);
      this.produits = prods;
    });
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherProds() {
    this.produitService.rechercherParNom(this.nomProduit).subscribe((prods) => {
      this.produits = prods;
      console.log(prods);
    });
  }

  onKeyUp(filterText: string) {
    this.produits = this.allProduits.filter((item) =>
      item.nomProduit.toLowerCase().includes(filterText)
    );
  }
}
