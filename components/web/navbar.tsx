"use client";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./theme-togge";
import { useConvexAuth } from "convex/react";
import { Spinner } from "../ui/spinner";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UserMenu } from "./user-menu";
import { SearchInput } from "./SearchInput";

export function Navbar() {
  const router = useRouter();
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Blog",
      link: "/blog",
    },
    {
      name: "Create",
      link: "/create",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
          setIsLoggingOut(false);
        },
        onError: (error) => {
          toast.error(error.error.message);
          setIsLoggingOut(false);
        },
      },
    });
  };

  return (
    <div className="w-full sticky top-0 z-50">
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {isLoading ? (
              <Spinner />
            ) : !isAuthenticated ? (
              <>
                <NavbarButton href="/auth/login" variant="secondary">
                  Login
                </NavbarButton>
                <NavbarButton href="/auth/sign-up" variant="primary">
                  Sign Up
                </NavbarButton>
              </>
            ) : (
              <>
                <SearchInput />
                <UserMenu isLoggingOut={isLoggingOut} onLogout={handleLogout} />
              </>
            )}

            <ModeToggle />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            {isAuthenticated && (
              <div className="flex-1 mx-2">
                <SearchInput />
              </div>
            )}
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              {isLoading ? (
                <Spinner />
              ) : !isAuthenticated ? (
                <>
                  <NavbarButton
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Login
                  </NavbarButton>
                  <NavbarButton
                    href="/auth/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    variant="primary"
                    className="w-full"
                  >
                    Sign Up
                  </NavbarButton>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? <Spinner /> : "Logout"}
                </Button>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
