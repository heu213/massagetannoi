import { get } from 'lodash';
import subVN from 'sub-vn';

interface addresss {
  street?:string,
  wardId?:string,
  districtId?:string,
  cityId?: string,
  ward?:string,
  district?:string,
  city?:string,
  [key:string]:any,
}
const formatAddress = (address: addresss) => {
  const { street, ward, district, city } = address || {};
  return {
    street,
    ward: get(subVN.getWardsByCode(ward), 'name'),
    district: get(subVN.getDistrictByCode(district), 'name'),
    city: get(subVN.getCityByCode(city), 'name'),
  }
};

const formatAddressV2 = (address: addresss) => {
  const { street, wardId, districtId, cityId, ...rest } = address || {};
  return {
    street,
    wardId,
    districtId,
    cityId,
    ward: get(subVN.getWardsByCode(wardId), 'name'),
    district: get(subVN.getDistrictByCode(districtId), 'name'),
    city: get(subVN.getCityByCode(cityId), 'name'),
    ...rest,
  }
};

const formatAddressV3 = (address: addresss) => {
  const { street, ward, district, city, ...rest } = address || {};
  let getWard = get(subVN.getCodeByWard(ward, city), 'code')
  let getDistrict = get(subVN.getCodeByDistrict(district, city), 'code')
  let getCity = get(subVN.getCodeProvince(city), 'code')
  return {
    street,
    wardId: getWard,
    districtId: getDistrict,
    cityId: getCity,
    ward,
    district,
    city,
    ...rest
  }
};

const formatAddressV4 = (wardId:any, districtId:any, cityId:any) => {
  let city = subVN.getProvinces();
  let district = subVN.getDistricts();
  let ward = subVN.getWards();
  
  return {
    city : city.find(e => e.code === cityId).name,
    district : district.find(e => e.code === districtId).name,
    ward : ward.find(e => e.code === wardId).name,
    cityId,
    districtId,
    wardId
  }
};
const keyAddress :any= {
  '0':'areaId',
  '1':'cityId',
  '2':'districtId',
  '3':'wardId',
}
const getAddressAvailable={
  getLast :function(path:string){
    const ap = String(path).split('/').slice(1).map((e,i)=>[keyAddress[String(i)],e]);
    return Object.fromEntries(new Map([ap.pop()])) as {areaId?:string,cityId?:string,districtId?:string,wardId?:string};
  },
  getAll :function(path:string){
    const ap = String(path).split('/').slice(1).map((e,i)=>[keyAddress[String(i)],e]);
    return Object.fromEntries(new Map(ap)) as {areaId?:string,cityId?:string,districtId?:string,wardId?:string};
  }
}


export default {
  formatAddress,
  formatAddressV2,
  formatAddressV3,
  formatAddressV4,
  getAddressAvailable,
}