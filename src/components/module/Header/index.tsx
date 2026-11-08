import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/module/Button";
import { NavLink } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { aboutNav, headerActions, primaryNav } from "@/config/navigation";

/** Figma: O2 / Header (desktop) + M / Header (mobile). */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-heading/8 bg-white">
      <div className="shell relative flex h-[63px] items-center justify-between gap-3 lg:h-[92px] lg:gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden h-full items-center gap-7 lg:flex">
          {primaryNav.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
          <span className="h-8 w-px bg-heading/12" aria-hidden />
          <NavLink item={aboutNav} menuAlign="right" />
          <div className="ml-1 flex items-center gap-3">
            <Button href={headerActions.primary.href} variant="gold">
              {headerActions.primary.label}
            </Button>
            <Button href={headerActions.secondary.href} variant="navy">
              {headerActions.secondary.label}
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Button href={headerActions.primary.href} variant="gold" size="sm" className="h-[34px] !px-2.5 !text-[11px] max-[359px]:hidden">
            {headerActions.primary.label}
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
