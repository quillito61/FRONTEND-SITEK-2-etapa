import axios from 'axios';
import { subDays, subHours } from 'date-fns';
import { Category, CategoryResponse, GetCategoryResponse } from 'src/types/APIcategory';
import { GetSubCategoryResponse, SubCategory, SubCategoryResponse } from 'src/types/APISubCategory';
import { BuyerType, GetBuyerTypesResponse } from 'src/types/buyerTypes';
import { GetPOS, Po } from 'src/types/pos';
import type { GetProductResponse, Item, ProductResponse } from '../types/product';
import API from './API';
import { authApi } from './auth-api';


const now = new Date();

class ProductsApi {
  getCateXProveedor(gln: any) {
    throw new Error('Method not implemented.');
  }
  GetTipoRegistros() {
    throw new Error('Method not implemented.');
  }
  getArticulo(arg0: number) {
    throw new Error('Method not implemented.');
  }
  getArticulosChg() {
    throw new Error('Method not implemented.');
  }
  getArticulos() {
    throw new Error('Method not implemented.');
  }
  createMensaje(arg0: null, arg1: number, email: any, arg3: string, arg4: null, arg5: null, asunto: number | null, descrip: string, arg8: string, arg9: boolean, arg10: boolean, arg11: number, categoryIdSelected: number, participantes: string, arg14: string, Tipo: string, arg16: string, foto: string | null, titulo: string, fecha: string) {
    throw new Error('Method not implemented.');
  }
  getMensajes(arg0: string) {
    throw new Error('Method not implemented.');
  }
  createProveedorsol(proveedor_id: number, proveedor_dsc: string, arg2: number, CedJuridica: string, RazonSocial: string, RepreLegal: string, GerenteGeneral: string, GerenteVentas: string, AgenteVentas: string, ContactoFinanc: string, Direccion: string, arg11: number, Barrio: string, Tel1: string, Tel2: string, NombreContactoFactElec: string, TelContactoFactElec: string, EmailContactoFactElec: string, EmailReciboContactoFactElec: string, CantidadLineasXFactura: number, arg20: number, AceptaDevoluc: boolean, OrdenCompra: boolean, DescuentoFijo: boolean, PorDescuentofijo: number, DescuentoConfidencial: boolean, PorcDescuentoConfidencial: number, DescuentoIntroduccion: boolean, PorcDescuentoIntroduccion: number, PartDinamicasComerciales: boolean, PartEspaciosPromocionales: boolean, PartDisplays: boolean, FrecuenciaVisitaTiendas: number, AportaCodigoCABYS: boolean, CodigoCABYS: string, arg35: number, arg36: number, DocEntregaFacElect: boolean, DocEntregaGuiaDespacho: boolean) {
    throw new Error('Method not implemented.');
  }
  async getProducts(): Promise<Item[]> {
    const token = localStorage.getItem('accessToken')
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const result = await API.get<ProductResponse>('gsone/getItems');
    return Promise.resolve(result.data.items);
  }
  async getProduct(gtin:string): Promise<Item> {
    const result = await API.get<GetProductResponse>('gsone/getItem', {params: {gtin: gtin}});
    return Promise.resolve(result.data.item);
  }
  async getPOS(): Promise<Po[]> {
    const result = await API.get<GetPOS>('gsone/getPOS');
    return Promise.resolve(result.data.POS);
  }
  //GetProductResponse
  async getCategories(): Promise<Category[]> {
    const result = await API.get<CategoryResponse>('gsone/getCategories');
    return Promise.resolve(result.data.categories);
  }
  async getSubCategories(CategoryId: number): Promise<SubCategory[]> {
    const result = await API.get<SubCategoryResponse>('gsone/getSubCategories', { params: { categoryId: CategoryId } });
    return Promise.resolve(result.data.subCategories);
  }

  async getSubCategory(CategoryId: number, SubcategoryId: number): Promise<SubCategory> {
    const result = await API.get<GetSubCategoryResponse>('gsone/getSubCategory', { params: { categoryId: CategoryId, subcategoryId: SubcategoryId } });
    return Promise.resolve(result.data.SubCategory);
  }
  async getCategory(CategoryId: number): Promise<Category> {
    const result = await API.get<GetCategoryResponse>('gsone/getCategory', { params: { categoryId: CategoryId } });
    return Promise.resolve(result.data.Category);
  }
  async addCategory(category: string): Promise<any> {
    const result = await API.post<CategoryResponse>('gsone/addCategory', { category });
    return Promise.resolve(result.data);
  }
  async updateProduct(gtin:string, categoryId: number, SubCategoryId:number, buyerType: number, unitBuy: boolean): Promise<any> {
    const result = await API.post<any>('gsone/updateProduct', { gtin, categoryId, SubCategoryId, buyerType, unitBuy });
    return Promise.resolve(result.data);
  }
  async updateProductComercialData(gtin: string, comercialLongDescription: string, comercialShortDescription: string, periCostSale: number, 
    periCostUtility: number, sarettoCostSale: number, sarettoCostUtility: number, supercomproCostUtility: number, PosID: number, supercomproCostSale: number): Promise<any> {
    const result = await API.post<any>('gsone/updateProductComercialData', { gtin, comercialLongDescription, comercialShortDescription, periCostSale, 
        periCostUtility, sarettoCostSale, sarettoCostUtility, supercomproCostUtility, PosID, supercomproCostSale });
        console.log(result);
    return Promise.resolve(result.data);
  }
  async addSubCategory(category: string, categoryId: number): Promise<any> {
    const result = await API.post<any>('gsone/addsubcategory', { category, categoryId });
    return Promise.resolve(result.data);
  }
  async getBuyerTypes(): Promise<BuyerType[]> {
    const result = await API.get<GetBuyerTypesResponse>('gsone/getBuyerTypes');
    return Promise.resolve(result.data.buyerTypes);
  }
}

export const productApi = new ProductsApi();
