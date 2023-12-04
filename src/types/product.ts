export interface Product {
  gtin: string;
  classificationCategoryDesc: string;
  tradeItemDescription: string;
  brandName: string;
  grossWeight: number;
  amount: number | null;
}
// To parse this data:
//
//   import { Convert, ProductResponse } from "./file";
//
//   const productResponse = Convert.toProductResponse(json);

export interface ProductResponse {
  ok: boolean;
  msg: string;
  items: Item[];
}
export interface GetProductResponse {
  ok: boolean;
  msg: string;
  item: Item;
}
export interface Item {
  idNivel: string;
  gln: string;
  partyName: string;
  additionalPartyIdentification: string;
  gtin: string;
  tradeItemUnitDescriptor: string;
  classificationCategoryCode: string;
  classificationCategoryDesc: string;
  startAvailabilityDateTime: Date;
  endAvailabilityDateTime: Date;
  functionalName: string;
  brandName: string;
  variantDescription: string;
  netContent: number;
  netContentUnitOfMeasure: string;
  height: number;
  width: number;
  depth: number;
  lengthUnitOfMeasure: string;
  grossWeight: number;
  weightUnitOfMeasure: string;
  packagingTypeDesc: string;
  tradeItemCountryOfOrigin: string;
  targetMarketCountryCode: string;
  tradeItemDescription: string;
  descriptionShort: string;
  additionalTradeItemIdentification: string;
  contactName: string;
  isPackagingMarkedReturnable: boolean;
  isPriceOnPack: boolean;
  isTradeItemADespatchUnit: boolean;
  packagingTypeCode: string;
  isTradeItemAnOrderableUnit: boolean;
  isTradeItemAnInvoiceUnit: boolean;
  isTradeItemAVariableUnit: boolean;
  isTradeItemAMinimumUnit: boolean;
  regulatoryPermitIdentification: string;
  permitStartDateTime: Date;
  permitEndDateTime: Date;
  invoiceName: string;
  legibilityStatus: string;
  gs1TradeItemIdentificationKeyCode: string;
  nameOfManufacturer: string;
  glnOfManufacturer: string;
  isTradeItemAConsumerUnit: string;
  availabilityType: string;
  amount: number | null;
  priceInformationCurrency: null | string;
  cabysCode?: string;
  cabysDesc?: string;
  Dun14?: string;
  CategoryId?: number;
  SubCategoryId?: number;
  TipoRegistro_ID?: number;
  TipoCompraId?: number;
  CompraEnUnidad?: boolean;
  subcategoria_dsc?: string;
  categoria_dsc?: string;
  tipoCompra_dsc?: string;
  ComercialLongDescription?: string;
  ComercialShortDescription?: string;
  ComercialPubliDescription?: string;
  PeriCostUtility?: number;
  SupercomproCostUtility?: number;
  SarettoCostUtility?: number;
  PeriCostSale?: number;
  SupercomproCostSale?: number;
  SarettoCostSale?: number;
  posID?: number;
  puntoVenta_dsc?: string | null;
  Status?: number;
  PerimercadosPOS?: string;
  SarettoPOS?: string;
  SupercomproPOS?: string;
  PriceFixed?: number;
  gtinItemFile?: string;
  periPrice?: number;
  sarettoPrice?: number;
  superPrice?: number;
  PeriConIVA?: number;
  PeriSinIVA?: number;
  SupercomproSinIVA?: number;
  SupercomproConIVA?: number;
  SarettoSinIVA?: number;
  SarettoConIVA?: number;
  CambioPrecio?: boolean;
  FotoProductoFrente?: any;
  FotoProductoLado?: any;
  FotoProductoArribaBAse?: any;
  superviquezCostSale?: number;
  superviquezCostUtility?: number;
  superviquezPrice?: number;
  superviquezSinIVA?: number;
  superviquezConIVA?: number;
  SuperViquezPOS?: string;
}


