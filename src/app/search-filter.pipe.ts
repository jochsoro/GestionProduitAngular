import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    console.log('pipe called');
    return list
      ? list.filter((item) =>
          item.nomProduit.toLowerCase().includes(filterText)
        )
      : [];
  }
}
