export interface MenuItem {
  name: string;
  description: string;
  price: number;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  reviews?: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  hours: string;
  established: string;
  phone: string;
  orderUrl: string;
  locationUrl: string;
  social: SocialLinks;
  menu: Record<string, MenuItem[]>;
}

export interface ShopFormData extends Omit<Shop, 'id' | 'menu'> {
  menu: {
    categoryName: string;
    items: MenuItem[];
  }[];
}