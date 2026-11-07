export default {
  async fetch(request, env, ctx) {
    // 1. PENGATURAN CORS
    // GANTI URL DI BAWAH INI DENGAN URL CLOUDFLARE PAGES ANDA
    const allowedOrigin = "https://nama-proyek-anda.pages.dev"; 
    
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
    };

    // Tangani Preflight Request (Wajib untuk browser)
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. ROUTING & SIMULASI DATABASE
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const orderId = pathParts[pathParts.length - 1];

    // Nanti, data ini diambil dari Database D1 Cloudflare (SELECT * FROM orders WHERE id = ?)
    // Saat ini kita pakai data statis dulu untuk testing
    const dummyOrders = {
      "ORD-001": { usdt: 1.00, fiat: "Rp 16.500", usd: "$1,00" },
      "ORD-002": { usdt: 5.50, fiat: "Rp 90.750", usd: "$5,50" },
      "ORD-003": { usdt: 10.00, fiat: "Rp 165.000", usd: "$10,00" }
    };

    if (orderId && dummyOrders[orderId]) {
      return new Response(JSON.stringify(dummyOrders[orderId]), {
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
      });
    }

    // Jika order tidak ditemukan
    return new Response(JSON.stringify({ error: "Order tidak ditemukan" }), {
      status: 404,
      headers: { 
        ...corsHeaders, 
        "Content-Type": "application/json" 
      },
    });
  },
};
