export async function GET(request) {
  const { searchParams } = new URL(request.url);
  // Lấy URL PDF thực tế từ tham số truy vấn
  const externalUrl = searchParams.get("url");

  if (!externalUrl) {
    return new Response("Missing URL parameter", { status: 400 });
  }

  try {
    // 🌟 Bước quan trọng: Yêu cầu từ Server Next.js tới API Server (Không bị chặn CORS)
    const response = await fetch(externalUrl);

    if (!response.ok) {
      return new Response(`Failed to fetch PDF: ${response.statusText}`, {
        status: response.status,
      });
    }

    // Trả về file PDF với Content-Type chính xác
    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // Có thể thêm Cache control nếu cần
      },
    });
  } catch (error) {
    console.error("Proxy fetch error:", error);
    return new Response(`Proxy error: ${error.message}`, { status: 500 });
  }
}
