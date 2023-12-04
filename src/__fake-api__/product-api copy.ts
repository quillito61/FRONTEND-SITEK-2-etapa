import { Category, CategoryResponse, GetCategoryResponse } from 'src/types/APIcategory';
import { GetSubCategoryResponse, SubCategory, SubCategoryResponse } from 'src/types/APISubCategory';
import { BuyerType, GetBuyerTypesResponse } from 'src/types/buyerTypes';
import { GetPOS, Po } from 'src/types/pos';
import type { GetProductResponse, Item, ProductResponse } from '../types/product';
import type { GetProductNewResponse, Articulo, ProductNewResponse } from '../types/product-new';
import {Marca,MarcaResponse,GetMarcaResponse} from 'src/types/APImarcas'
import {GetMercadoOrigenResponse,MercadoOrigen,MercadoOrigenResponse} from 'src/types/APImercadoOrigen'
import {GetPlazosPagoResponse,PlazosPago,PlazosPagoResponse} from 'src/types/APIplazosPago'
import {GetTipoCompraResponse,TipoCompra,TipoCompraResponse} from 'src/types/APItiposCompra'
import {GetTiposGravadosResponse,TiposGravados,TiposGravadosResponse} from 'src/types/APItiposgravados'
import {GetUnidadEmpaqueResponse,UnidadEmpaque,UnidadEmpaqueResponse} from 'src/types/APIunidadempaque'
import {GetProveedorResponse,Proveedor,ProveedoresResponse} from 'src/types/APIproveedores'
import {GetProveedorsolResponse,Proveedorsol,ProveedoresolResponse} from 'src/types/APIproveedores'
import {GetTiposRegistroResponse,TiposRegistro,TiposRegistroResponse} from 'src/types/APITiposRegistro'

import {getAsuntosResponse,Asunto,AsuntosResponse} from 'src/types/APIasuntos'
import {getMensajesResponse,ReportesResponse,Mensajes,MensajesResponse, Reportes} from 'src/types/APImensajes'

import API from './API';
import { IitemDiscounts, ItemsDiscount } from 'src/types/IitemDiscounts';
import { IRuleType } from 'src/types/IRuleType';

import { ActividadEconomica, ActividadEconomicaResponse } from 'src/types/APIactividadEconomica';
import { CantonDistritoProvincia, CantonDistritoProvinciaResponse } from 'src/types/APIcantondistritoProvincia';
import { ConstructionOutlined } from '@mui/icons-material';



const now = new Date();

export enum ProductStatus {
  REJECT = -1,
  ACCEPT = 1,
}

class ProductsApi {



  
  async getProducts(): Promise<Item[]> {
    
    const token = localStorage.getItem('accessToken');
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const result = await API.get<ProductResponse>('gsone/getItems');
    return Promise.resolve(result.data.items);
  }
  async getProduct(gtin: string): Promise<Item> {
    const result = await API.get<GetProductResponse>('gsone/getItem', { params: { gtin: gtin } });
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

  

async getCateXProveedor(gln: number): Promise<Category[]> {
  console.log('Parametro',gln)
  const result = await API.get<CategoryResponse>('gsone/getCateXProveedor', { params: { gln: gln } });
  console.log('datos inic', result.data.categories)
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
  async getRuleType(id: string): Promise<string> {
    const result = await API.get<IRuleType>('gsone/getRuleCodeType', { params: { id: id } });
    return Promise.resolve(result.data.RuleCodeType.Description)
  }
  async addCategory(category: string): Promise<any> {
    const result = await API.put<CategoryResponse>('gsone/addCategory', { category });
    return Promise.resolve(result.data);
  }
  async updateProduct(gtin: string, categoryId: number, SubCategoryId: number,TipoRegistro_ID: number, buyerType: number, FotoProductoFrente: any,FotoProductoLado: any,FotoProductoArribaBase: any, unitBuy: boolean): Promise<any> {
    console.log('datos en api',gtin, categoryId, SubCategoryId, TipoRegistro_ID ,buyerType, FotoProductoFrente)
    //alert('Pare aqui')
    const result = await API.patch<any>('gsone/updateProduct', { gtin, categoryId, SubCategoryId, TipoRegistro_ID ,buyerType, FotoProductoFrente,FotoProductoLado,FotoProductoArribaBase,unitBuy });
    return Promise.resolve(result.data);
  }
  async updateCode(gtin: string, itmCode: string): Promise<any> {
    const result = await API.patch<any>('gsone/updateCode', { gtin, itmCode });
    return Promise.resolve(result.data);
  }
  //
  async updateProductComercialData(gtin: string, comercialLongDescription: string, comercialShortDescription: string,comercialPubliDescription: string, periCostSale: number,
    periCostUtility: number, sarettoCostSale: number, sarettoCostUtility: number, supercomproCostUtility: number, PosID: number,
    supercomproCostSale: number, periSelected: string, sarettoSelected: string, superComproSelected: string, priceFixed: number, superPrice: number,
    sarettoPrice: number, periPrice: number, PeriSinIVA: number, PeriConIVA: number, SupercomproSinIVA: number, SupercomproConIVA: number, SarettoSinIVA: number, SarettoConIVA: number,
    confidencial: number, introduccion: number, fijo: number, promocional: number ,ddc :number, nodevolucion:number,
    superviquezCostSale:number, superviquezCostUtility:number,superviquezPrice:number,superviquezSinIVA:number, superviquezConIVA:number,
    superviquezSelected: string
    
    
    
    
    ): Promise<any> {
    const result = await API.patch<any>('gsone/updateProductComercialData', {
      gtin, comercialLongDescription, comercialShortDescription, comercialPubliDescription,periCostSale,
      periCostUtility, sarettoCostSale, sarettoCostUtility, supercomproCostUtility, PosID,
      supercomproCostSale, periSelected, sarettoSelected, superComproSelected, priceFixed, superPrice, sarettoPrice, periPrice
      , PeriSinIVA, PeriConIVA, SupercomproSinIVA, SupercomproConIVA, SarettoSinIVA, SarettoConIVA, 
      confidencial, introduccion, fijo, promocional,ddc,nodevolucion,
      superviquezCostSale,superviquezCostUtility,superviquezPrice,superviquezSinIVA,superviquezConIVA,superviquezSelected
    });
    //console.log(superviquezCostSale,superviquezCostUtility,superviquezPrice,superviquezSinIVA,superviquezConIVA,superviquezSelected)
    //alert('alto')
    return Promise.resolve(result.data);
  }
  async addSubCategory(category: string, categoryId: number): Promise<any> {
    const result = await API.patch<any>('gsone/addsubcategory', { category, categoryId });
    return Promise.resolve(result.data);
  }
  async addStatusProduct(gtin: string, Status: ProductStatus): Promise<any> {
    const token = localStorage.getItem('accessToken');
    
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const result = await API.put('gsone/addItemStatus', { gtin, Status });
    return Promise.resolve(result.data);
  }
  async getBuyerTypes(): Promise<BuyerType[]> {
    const result = await API.get<GetBuyerTypesResponse>('gsone/getBuyerTypes');
    return Promise.resolve(result.data.buyerTypes);
  }
  async getItemDicounts(gtin: string): Promise<ItemsDiscount[]> {
    const result = await API.get<IitemDiscounts>('gsone/getItemDicounts', { params: { gtin: gtin } });
    return Promise.resolve(result.data.itemsDiscounts);
  }
  
  async getProveedores(): Promise<Proveedor[]> {
    //const token = localStorage.getItemNew('accessToken')
    //API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const result = await API.get<ProveedoresResponse>('gsone/getProveedores');
    //console.log(result.data )
    //console.log(result.data.Proveedores)
    return Promise.resolve(result.data.Proveedores);
  }

  async getProveedor(proveedor_id: string): Promise<Proveedor> {
    const result = await API.get<GetProveedorResponse>('gsone/getProveedor', { params: { proveedor_id: proveedor_id } });
    console.log(result)
    return Promise.resolve(result.data.proveedor);
  }

  async getArticulos(): Promise<Articulo[]> {
    const token = localStorage.getItem('accessToken')
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //console.log('El token es:',token)
    const result = await API.get<ProductNewResponse>('gsone/GetArticulos');
    return Promise.resolve(result.data.articulos);
  }

  async getArticulosChg(): Promise<Articulo[]> {
    const token = localStorage.getItem('accessToken')
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //console.log('El token es:',token)
    const result = await API.get<ProductNewResponse>('gsone/GetArticulosChg');
    return Promise.resolve(result.data.articulos);
  }

  async getProveedoresol(): Promise<Proveedorsol[]> {
    const token = localStorage.getItem('accessToken')
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const result = await API.get<ProveedoresolResponse>('gsone/getProveedoresol');
    
    console.log('LOS PROVEEDORES ',result.data.Proveedores)
    return Promise.resolve(result.data.Proveedores);
  }

  async getMensajes(tipo:string): Promise<Mensajes[]> {
    const token = localStorage.getItem('accessToken')
    console.log('el tipo',tipo)
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const result = await API.get<MensajesResponse>('gsone/getMensajes' , { params: { tipoMsg: tipo } });
    //alert(result)
    console.log('MENSAJES AL API',result.data.Mensaje)
    return Promise.resolve(result.data.Mensaje);
  }

  async getReportes(proveedor_id: string): Promise<Reportes[]> {
    const result = await API.get<ReportesResponse>('gsone/getReportes', { params: { proveedor_id: proveedor_id } });
    console.log(result)
    return Promise.resolve(result.data.Reportes);
  }

  async getAsuntos(): Promise<Asunto[]> {
    //const token = localStorage.getItemNew('accessToken')
    //API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const result = await API.get<AsuntosResponse>('gsone/getAsuntos');
    console.log('resultado asuntos api:',result)
    return Promise.resolve(result.data.asunto);
  }
  async createProveedor (
    proveedor_id: string,
    proveedor_dsc: string,
    gln: string,
    fechaSolicitud?: Date,
    CedJuridica?: string,
    RazonSocial?: string,
    RepreLegal?: string,
    GerenteGeneral?: string,
    GerenteVentas?: string,
    AgenteVentas?: string,
    ContactoFinanc?: string,
    Direccion?: string,
    canton_id?: number,
    Barrio?: string,
    Tel1?: string,
    Tel2?: string,
    NombreContactoFactElec?: string,
    TelContactoFactElec?: string,
    EmailContactoFactElec?: string,
    EmailReciboContactoFactElec?: string,
    CantidadLineasXFactura?: number,
    TipoEntrega?: number,
    AceptaDevoluc?: boolean,
    OrdenCompra?: boolean,
    DescuentoFijo?: boolean,
    PorDescuentofijo?: number,
    DescuentoConfidencial?: boolean,
    PorcDescuentoConfidencial?: number,
    DescuentoIntroduccion?: boolean,
    PorcDescuentoIntroduccion?: number,
    PartDinamicasComerciales?: boolean,
    PartEspaciosPromocionales?: boolean,
    PartDisplays?: boolean,
    FrecuenciaVisitaTiendas?: number,
    AportaCodigoCABYS?: boolean,
    CodigoCABYS?: string,
    ActividadEconomicaID?: number,
    PlazoPagoID?: number,
    DocEntregaFacElect?: boolean,
    DocEntregaGuiaDespacho?: boolean,
    CambioPrecio?:boolean

  )
  : Promise<any> {
    const result = await API.post('gsone/createProveedor', {
      
        proveedor_id,
        proveedor_dsc,
        gln,
        fechaSolicitud ,
        CedJuridica  ,
        RazonSocial  ,
        RepreLegal  ,
        GerenteGeneral  ,
        GerenteVentas  ,
        AgenteVentas  ,
        ContactoFinanc  ,
        Direccion  ,
        canton_id ,
        Barrio  ,
        Tel1  ,
        Tel2  ,
        NombreContactoFactElec  ,
        TelContactoFactElec  ,
        EmailContactoFactElec  ,
        EmailReciboContactoFactElec  ,
        CantidadLineasXFactura  ,
        TipoEntrega  ,
        AceptaDevoluc  ,
        OrdenCompra  ,
        DescuentoFijo  ,
        PorDescuentofijo  ,
        DescuentoConfidencial  ,
        PorcDescuentoConfidencial  ,
        DescuentoIntroduccion  ,
        PorcDescuentoIntroduccion  ,
        PartDinamicasComerciales  ,
        PartEspaciosPromocionales  ,
        PartDisplays  ,
        FrecuenciaVisitaTiendas  ,
        AportaCodigoCABYS  ,
        CodigoCABYS  ,
        ActividadEconomicaID  ,
        PlazoPagoID  ,
        DocEntregaFacElect  ,
        DocEntregaGuiaDespacho  ,
        CambioPrecio,


    });
    //alert(result.data)
    return Promise.resolve(result.data);}


    
  async newArticulo (
    ProveedorID: string,
    ArticuloID: number | null,
    DescripcionProducto: string,
    MarcaID: number,
    TamanoGessa: string,
    IdUnidadEmpaque: number,
    EAN13: string,
    DUN14: string,
    CompraEnUnidades: boolean,
    DescripcionLarga: string |null,
    DescripcionPublicacion: string |null,
    UnidadMedida: string,
    SaborAroma: string,
    categoria_id: number,
    subcategoria_id: number,
    SegmentoID: number,
    PlazoPagoID: number,
    tipoCompra_id: number,
    CabysCodigo: string,
    CostoEmpaque: number,
    CostoUnitario: number,
    GravadoID: number,
    GravadoOExento: boolean,
    PorcImpConsumo: number,
    TiempoVigencia: number,
    MedProdAnchoProducto: number,
    MedProdAltoProducto: number,
    MedProdLargoProducto: number,
    MedProdPesoNeto: number,
    MedProdPesoBruto: number,
    MedProdPesoEscurrido: number,
    MedProdDiametro: number,
    MedCajaAnchoProducto: number,
    MedCajaAltoProducto: number,
    MedCajaLargoProducto: number,
    FotoProductoFrente: any,
    FotoProductoLado: any,
    FotoProductoArribaBase: any,
    DescuentoConfidencialDC: number,
    DescuentoIntroduccionDEI: number,
    DescuentoFijoDFI: number,
    DescuentoNoDevolucionDND: number,
    CentroDistribucionTAE: number,
    PromocionalPAE: number,
    status:string ,
    CambioPrecio: boolean,
    ): Promise<any> {
    const result = await API.post('gsone/createArticulo', {  
      ProveedorID 
      ,ArticuloID 
      ,DescripcionProducto 
      ,MarcaID 
      ,TamanoGessa 
      ,IdUnidadEmpaque 
      ,EAN13 
      ,DUN14 
      ,CompraEnUnidades 
      ,DescripcionLarga
      ,DescripcionPublicacion
      ,UnidadMedida 
      ,SaborAroma 
      ,categoria_id 
      ,subcategoria_id 
      ,SegmentoID 
      ,PlazoPagoID 
      ,tipoCompra_id 
      ,CabysCodigo 
      ,CostoEmpaque 
      ,CostoUnitario 
      ,GravadoID 
      ,GravadoOExento 
      ,PorcImpConsumo 
      ,TiempoVigencia 
      ,MedProdAnchoProducto 
      ,MedProdAltoProducto 
      ,MedProdLargoProducto 
      ,MedProdPesoNeto 
      ,MedProdPesoBruto 
      ,MedProdPesoEscurrido 
      ,MedProdDiametro 
      ,MedCajaAnchoProducto 
      ,MedCajaAltoProducto 
      ,MedCajaLargoProducto 
      ,FotoProductoFrente 
      ,FotoProductoLado 
      ,FotoProductoArribaBase 
      ,DescuentoConfidencialDC 
      ,DescuentoIntroduccionDEI 
      ,DescuentoFijoDFI 
      ,DescuentoNoDevolucionDND 
      ,CentroDistribucionTAE 
      ,PromocionalPAE
      ,status
      ,CambioPrecio
    });
    console.log('resultado en la app',result.data)
    return Promise.resolve(result.data);
  }
  async getMarcas(): Promise<Marca[]> {
    const result = await API.get<MarcaResponse>('gsone/getMarcas');
    return Promise.resolve(result.data.marcas);
  }

  async getActividadEconomica(): Promise<ActividadEconomica[]> {
    const result = await API.get<ActividadEconomicaResponse>('gsone/getActividadEconomica');
    return Promise.resolve(result.data.actividadEcono);
  }

  async getCantonDistritoProvincia(): Promise<CantonDistritoProvincia[]> {
    const result = await API.get<CantonDistritoProvinciaResponse>('gsone/getCantonDistritoProvincia');
    //console.log(result)
    return Promise.resolve(result.data.cantones);
  }

  async getMercadoOrigen(): Promise<MercadoOrigen[]> {
    const result = await API.get<MercadoOrigenResponse>('gsone/getMercadoOrigen');
    return Promise.resolve(result.data.MercadoOrigen);
  }

  async getPlazosPago(): Promise<PlazosPago[]> {
    const result = await API.get<PlazosPagoResponse>('gsone/getPlazosPago');
    return Promise.resolve(result.data.plazosPago);
  }

  async GetTipoCompra(): Promise<TipoCompra[]> {
    const result = await API.get<TipoCompraResponse>('gsone/getTipoCompra');
    return Promise.resolve(result.data.tipocompra);
  }

  async GetTipoRegistros(): Promise<TiposRegistro[]> {
    const result = await API.get<TiposRegistroResponse>('gsone/getTipoRegistro');
    return Promise.resolve(result.data.tiposregistro);
  }

  async getTiposGravados(): Promise<TiposGravados[]> {
    const result = await API.get<TiposGravadosResponse>('gsone/getTiposGravados');
    return Promise.resolve(result.data.tiposGravados);
  }

  async GetUnidadEmpaque(): Promise<UnidadEmpaque[]> {    
    const result = await API.get<UnidadEmpaqueResponse>('gsone/getUnidadEmpaque');
    return Promise.resolve(result.data.UnidadEmpaque);
  }

  

  async createProveedorsol (
    proveedor_id: number | null,
    proveedor_dsc: string,
    categoria_id: number,
    CedJuridica?: string,
    RazonSocial?: string,
    RepreLegal?: string,
    GerenteGeneral?: string,
    GerenteVentas?: string,
    AgenteVentas?: string,
    ContactoFinanc?: string,
    Direccion?: string,
    canton_id?: number,
    Barrio?: string,
    Tel1?: string,
    Tel2?: string,
    NombreContactoFactElec?: string,
    TelContactoFactElec?: string,
    EmailContactoFactElec?: string,
    EmailReciboContactoFactElec?: string,
    CantidadLineasXFactura?: number,
    TipoEntrega?: number,
    AceptaDevoluc?: boolean,
    OrdenCompra?: boolean,
    DescuentoFijo?: boolean,
    PorDescuentofijo?: number,
    DescuentoConfidencial?: boolean,
    PorcDescuentoConfidencial?: number,
    DescuentoIntroduccion?: boolean,
    PorcDescuentoIntroduccion?: number,
    PartDinamicasComerciales?: boolean,
    PartEspaciosPromocionales?: boolean,
    PartDisplays?: boolean,
    FrecuenciaVisitaTiendas?: number,
    AportaCodigoCABYS?: boolean,
    CodigoCABYS?: string,
    ActividadEconomicaID?: number,
    PlazoPagoID?: number,
    DocEntregaFacElect?: boolean,
    DocEntregaGuiaDespacho?: boolean

  )
  : Promise<any> {
    const result = await API.post('gsone/createProveedorsol', {
      
        proveedor_id,
        proveedor_dsc,
        categoria_id,
        CedJuridica  ,
        RazonSocial  ,
        RepreLegal  ,
        GerenteGeneral  ,
        GerenteVentas  ,
        AgenteVentas  ,
        ContactoFinanc  ,
        Direccion  ,
        canton_id ,
        Barrio  ,
        Tel1  ,
        Tel2  ,
        NombreContactoFactElec  ,
        TelContactoFactElec  ,
        EmailContactoFactElec  ,
        EmailReciboContactoFactElec  ,
        CantidadLineasXFactura  ,
        TipoEntrega  ,
        AceptaDevoluc  ,
        OrdenCompra  ,
        DescuentoFijo  ,
        PorDescuentofijo  ,
        DescuentoConfidencial  ,
        PorcDescuentoConfidencial  ,
        DescuentoIntroduccion  ,
        PorcDescuentoIntroduccion  ,
        PartDinamicasComerciales  ,
        PartEspaciosPromocionales  ,
        PartDisplays  ,
        FrecuenciaVisitaTiendas  ,
        AportaCodigoCABYS  ,
        CodigoCABYS  ,
        ActividadEconomicaID  ,
        PlazoPagoID  ,
        DocEntregaFacElect  ,
        DocEntregaGuiaDespacho  


    });
    //alert(result.data)
    return Promise.resolve(result.data);}

    

    async getProveedorsol(proveedor_id: number): Promise<Proveedorsol> {
      const result = await API.get<GetProveedorsolResponse>('gsone/getProveedorsol', { params: { proveedor_id: proveedor_id } });
      console.log('Proveedor solicitado', proveedor_id)
      console.log(result)
      return Promise.resolve(result.data.proveedor);
    }

    async getArticulo(ArticuloId: number): Promise<Articulo> {
      console.log('artiparam',ArticuloId)
      const result = await API.get<GetProductNewResponse>('gsone/getArticulo', { params: {ArticuloId : ArticuloId } });
      console.log('resultado api',result.data.articulo)
      return Promise.resolve(result.data.articulo);
    }

    async updateMensaje(
      mensaje_id: number ,
      UsuarioSend: string,
      UsuarioRecep: string ,
      msgMensajeRespuesta: string,
      msgEliminado: boolean,        // true si no se acepta la cita
      participantesCia: string,
      status: string,
      totalDestinos: string,
      fechaCita?: string,
      //fechaDefinitiva?: string ,

    ): Promise<any> {
      //alert(fechaCita)
      //alert('Pare aqui')
      const result = await API.patch<any>('gsone/updateMensaje', 
      { 
        mensaje_id,
        UsuarioSend,
        UsuarioRecep,
        msgMensajeRespuesta,
        msgEliminado,        // true si no se acepta la cita
        participantesCia,
        status,
        totalDestinos,
        fechaCita,
        //fechaDefinitiva,
      });
      return Promise.resolve(result.data);
    }

    async createMensaje(
      mensaje_id: number | null,
      mensajeResp_id: number | null,
      UsuarioSend: string,
      UsuarioRecep: string | null,
      msgDate: Date | null,
      msgDateCita: string | null,
      asunto_id: number | null,
      msgMensaje: string,
      msgMensajeRespuesta: string,
      msgUsuarioRecepOk: boolean |null,
      msgEliminado: boolean | null,
      IdMensajeOriginal: number | null,
      categoria_id: number,
      participantes: string,
      participantesCia: string,
      tipoMensaje: string,
      status: string,
      foto: any,
      titulo: string,
      fechaCita: string,
       ): Promise<any> {
      const result = await API.post<any>('gsone/createMensaje', {
        mensaje_id, mensajeResp_id,UsuarioSend,UsuarioRecep,msgDate,msgDateCita,
        asunto_id,msgMensaje,msgMensajeRespuesta,msgUsuarioRecepOk,msgEliminado,
        IdMensajeOriginal,categoria_id,participantes,participantesCia,tipoMensaje,status,foto,titulo,fechaCita
      });
      console.log('resultados data..........................:',mensaje_id,titulo,'FECHA CITA:',fechaCita)
     
      return Promise.resolve(result.data);}
  
      

}

export const productApi = new ProductsApi();
