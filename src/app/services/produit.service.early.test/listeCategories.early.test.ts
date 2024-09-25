// Unit tests for: listeCategories

import { Observable, of, throwError } from 'rxjs';
import { Categorie } from '../../model/categorie.model';
import { ProduitService } from '../produit.service';

// Mock classes

class MockHttpClient {
  get = jest.fn();
}

describe('ProduitService.listeCategories() listeCategories method', () => {
  let service: ProduitService;
  let mockHttpClient: MockHttpClient;

  beforeEach(() => {
    mockHttpClient = new MockHttpClient() as any;
    service = new ProduitService(mockHttpClient as any);
  });

  describe('Happy Path', () => {
    it('should return an observable of categories when the HTTP call is successful', (done) => {
      // Arrange: Mock the HTTP client's get method to return a successful response
      const mockCategories: Categorie[] = [
        { idCat: 1, nomCat: 'Category 1' },
        { idCat: 2, nomCat: 'Category 2' },
      ];
      mockHttpClient.get.mockReturnValue(of(mockCategories) as any);

      // Act: Call the listeCategories method
      const result: Observable<Categorie[]> = service.listeCategories();

      // Assert: Verify that the result matches the expected categories
      result.subscribe((categories) => {
        expect(categories).toEqual(mockCategories);
        done();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle an empty array response gracefully', (done) => {
      // Arrange: Mock the HTTP client's get method to return an empty array
      mockHttpClient.get.mockReturnValue(of([]) as any);

      // Act: Call the listeCategories method
      const result: Observable<Categorie[]> = service.listeCategories();

      // Assert: Verify that the result is an empty array
      result.subscribe((categories) => {
        expect(categories).toEqual([]);
        done();
      });
    });

    it('should handle an error response gracefully', (done) => {
      // Arrange: Mock the HTTP client's get method to return an error
      const errorResponse = new Error('Network error');
      mockHttpClient.get.mockReturnValue(throwError(errorResponse) as never);

      // Act: Call the listeCategories method
      const result: Observable<Categorie[]> = service.listeCategories();

      // Assert: Verify that the error is handled
      result.subscribe({
        next: () => {
          // This should not be called
          fail('Expected an error, but got a successful response');
        },
        error: (error) => {
          expect(error).toBe(errorResponse);
          done();
        },
      });
    });
  });
});

// End of unit tests for: listeCategories
