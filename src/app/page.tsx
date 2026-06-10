import { redirect } from 'next/navigation';

// 공개 진입점은 PC1 자가진단 하나뿐.
// (전체 MVP 메뉴는 내부 데모용 /admin/demo 로 이동했다.)
export default function Home() {
  redirect('/fd/pc1-quiz');
}
