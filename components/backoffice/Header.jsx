'use client';

import { useAuth } from '../../context/auth-context';
import UserNav from './UserNav';
import { ThemeToggle } from '../ThemeToggle';
import { Menu, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Header({ showSideBar, setShowSideBar }) {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-700 dark:border-slate-600">
      <div className="flex h-16 items-center px-4 justify-between">
        <Button
          variant="ghost"
          className="sm:hidden"
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative" size="icon">
                <Bell className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-orange-600"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Nouvelle commande</p>
                  <p className="text-xs text-slate-500">Il y a 5 minutes</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Stock faible</p>
                  <p className="text-xs text-slate-500">Il y a 1 heure</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
