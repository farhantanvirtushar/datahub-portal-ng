export interface NavItem {
  name: string;
  icon: string;
  url?: string;
  pages: NavItem[];
}
