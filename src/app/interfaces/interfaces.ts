export interface Database {
  title:     string;
  data:      Category[];
  photo:     string;
  etaRange:  string;
  location:  string;
  fareBadge: string;
}

export interface Category {
  itemUuids:   string[];
  title:       string;
  uuid:        string;
  displayType: null;
  recipes:     Recipe[];
}

export interface Recipe {
  description:       string;
  imageUrl:          string;
  price:             number;
  title:             string;
  uuid:              string;
}

