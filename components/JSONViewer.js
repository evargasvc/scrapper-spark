import dynamic from 'next/dynamic'
const ReactJson = dynamic(() => import('react-json-view'),
{ssr: false})


function JSONViewer (props) {
  return <ReactJson  collapsed={true} {...props} />
}

export default JSONViewer;