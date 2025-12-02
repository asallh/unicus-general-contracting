import Link from "next/link";
import Image from "next/image";
import { NavigationMenu } from "radix-ui";

import React from "react";

export default function MainNavigation(): React.ReactElement {
  return (
    <div className="flex flex-col items-center">
      <NavigationMenu.Root className="bg-brand-secondary text-brand-textColorMain flex w-full items-center justify-between p-4 px-12">
        <Image
          src="/full_primary/full_primary.png"
          alt="Unicus General Contracting Logo"
          width={210}
          height={90}
        />
        <NavigationMenu.List className="flex flex-row items-center justify-center gap-4">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:text-brand-primary text-lg transition-colors duration-200 ">
              <NavigationMenu.Link>
                <Link href="/">Home</Link>
              </NavigationMenu.Link>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:text-brand-primary text-lg transition-colors duration-200">
              <NavigationMenu.Link asChild>
                <Link href="/pages/about">About</Link>
              </NavigationMenu.Link>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:text-brand-primary text-lg transition-colors duration-200">
              <NavigationMenu.Link>
                <Link href="/pages/services">Services</Link>
              </NavigationMenu.Link>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="hover:text-brand-primary text-lg transition-colors duration-200">
              <NavigationMenu.Link>
                <Link href="/pages/projects">Our Work</Link>
              </NavigationMenu.Link>
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </div>
  );
}
