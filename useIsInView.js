/* Credits: https://wattenberger.com/blog/react-hooks */
const useIsInView = (margin="0px") => {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(([ entry ]) => {
      setIntersecting(entry.isIntersecting)
    }, { rootMargin: margin })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.unobserve(ref.current)
    }
  }, [])

  return [ref, isIntersecting]
}
