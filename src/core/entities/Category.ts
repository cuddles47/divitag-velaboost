export class Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  iconUrl?: string;
  iconSize?: number[];
  createdAt: Date;
  updatedAt: Date;

  constructor(params: {
    id: string;
    name: string;
    slug: string;
    parentId?: string;
    iconUrl?: string;
    iconSize?: number[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.slug = params.slug;
    this.parentId = params.parentId;
    this.iconUrl = params.iconUrl;
    this.iconSize = params.iconSize;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}