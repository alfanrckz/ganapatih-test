import React from 'react';
import { Button } from '../../atoms/buttons/Button';
import { Input } from '../../atoms/inputs/Input';

export const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
      />
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};