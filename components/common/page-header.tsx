type PageHeaderProps = {
    title: string;
    subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div>
            <h1 className="text-5xl fond-heading font-bold mb-2">{title}</h1>
            <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>
        </div>
    )

}