export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Kalau kamu mau sidebar/dashboard header, taruh di sini */}
      {children}
    </div>
  )
}
