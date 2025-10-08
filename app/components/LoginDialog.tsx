'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { toast } from 'sonner';
import { Button, TextField } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/app/context/AuthContext';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          toast.error('Нууц үг хоорондоо тохирохгүй байна.');
          return;
        }
        toast.success('Бүртгэл амжилттай үүслээ!');
      } else {
        await login(email, password);
        toast.success('Амжилттай нэвтэрлээ!');
      }
      onOpenChange(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('Алдаа гарлаа, дахин оролдоно уу.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      toast.success('Google-ээр нэвтэрлээ!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Google нэвтрэхэд алдаа гарлаа.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isRegister ? 'Бүртгүүлэх' : 'Нэвтрэх'}</DialogTitle>
          <DialogDescription>
            {isRegister
              ? 'Шинэ хэрэглэгчийн бүртгэл үүсгэнэ үү'
              : 'Өөрийн бүртгэлээр системд нэвтэрнэ үү'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <TextField
            fullWidth
            label="Имэйл хаяг"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
          />

          <TextField
            fullWidth
            label="Нууц үг"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            size="small"
            sx={{ mb: 1 }}
          />

          {isRegister && (
            <TextField
              fullWidth
              label="Нууц үг баталгаажуулах"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading
              ? isRegister
                ? 'Бүртгэж байна...'
                : 'Нэвтэрч байна...'
              : isRegister
              ? 'БҮРТГҮҮЛЭХ'
              : 'НЭВТРЭХ'}
          </Button>

          <div className="flex items-center gap-2 my-2">
            <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
            <span className="text-gray-400 text-sm">эсвэл</span>
            <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleGoogleLogin}
            startIcon={<FcGoogle size={20} />}
            disabled={isLoading}
            sx={{
              backgroundColor: 'white',
              borderColor: '#e0e0e0',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { backgroundColor: '#f8f8f8' },
            }}
          >
            Google-ээр {isRegister ? 'бүртгүүлэх' : 'нэвтрэх'}
          </Button>

          <p className="text-sm text-center text-gray-500 mt-2">
            {isRegister ? (
              <>
                Бүртгэлтэй хэрэглэгч үү?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Нэвтрэх
                </button>
              </>
            ) : (
              <>
                Бүртгэл байхгүй юу?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Бүртгүүлэх
                </button>
              </>
            )}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
