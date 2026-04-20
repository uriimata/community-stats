import { ElementApiResponse, ElementCataleg } from '../models/element.model';

/**
 * Transforma un sol element de l'API al model intern
 */
export function adaptarElementApi(apiResponse: ElementApiResponse): ElementCataleg {
  return {
    id: apiResponse.id,
    nom: apiResponse.nom,
    valor: apiResponse.valor,
    esPeak: apiResponse.isPeak,
    plataforma: apiResponse.platform,
    imatgeUrl: apiResponse.imatge
  };
}

/**
 * Transforma un array d'elements de l'API al model intern
 */
export function adaptarElementsApi(apiResponses: ElementApiResponse[]): ElementCataleg[] {
  return apiResponses.map(element => adaptarElementApi(element));
}