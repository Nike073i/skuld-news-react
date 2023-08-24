export interface SidebarItemType {
    path: string;
    textKey: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}
