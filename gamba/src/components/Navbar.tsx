'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would handle authentication here
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
  }

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Gamba
        </Link>
        <div>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {username}</span>
              <Button onClick={handleLogout} variant="secondary">Logout</Button>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Login</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                  <DialogDescription>
                    Enter your credentials to access your account.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleLogin}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Login</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </nav>
  )
}

