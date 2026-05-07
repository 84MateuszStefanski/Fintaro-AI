import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      currency?: string;
      language?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    currency?: string;
    language?: string;
  }
}
