import React, { useEffect, useMemo, useRef, useState } from 'react'
import Wheel from './components/Wheel.jsx'

const STORAGE_KEY = 'tirage-roue-double:students:enabled'

function usePersistedEnabled(ids) {
  const [enabled, setEnabled] = useState(() => new Set())
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const arr = JSON.parse(raw)
        setEnabled(new Set(arr))
      } catch {}
    }
  }, [])
  useEffect(() => {
    if (!ids || ids.length === 0) return
    // initialize with all enabled if nothing saved
    setEnabled(prev => {
      if (prev.size === 0) return new Set(ids)
      // prune ids that no longer exist
      const next = new Set()
      ids.forEach(id => { if (prev.has(id)) next.add(id) })
      return next.size ? next : new Set(ids)
    })
  }, [ids?.join('|')])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(enabled)))
  }, [enabled])
  return [enabled, setEnabled]
}

export default function App() {
  const [terms, setTerms] = useState([])
  const [students, setStudents] = useState([])
  const [enabledSet, setEnabledSet] = usePersistedEnabled(useMemo(() => students.map(s => s.id), [students]))

  const [selectedTermIdx, setSelectedTermIdx] = useState(null)
  const [selectedStudentIdx, setSelectedStudentIdx] = useState(null)

  const [spinning, setSpinning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [reveal, setReveal] = useState(false)

  const spinDurationMs = 10000 // 10s suspense

  useEffect(() => {
    // load JSON from public folder
    fetch('/data/terms.json').then(r => r.json()).then(setTerms).catch(() => setTerms([]))
    fetch('/data/students.json').then(r => r.json()).then(setStudents).catch(() => setStudents([]))
  }, [])

  const eligibleStudents = useMemo(() => students.filter(s => enabledSet.has(s.id)), [students, enabledSet])

  const canSpin = terms.length > 0 && eligibleStudents.length > 0 && !spinning

  function randomIndex(n) {
    return Math.floor(Math.random() * n)
  }

  function startSpin() {
    if (!canSpin) return
    setReveal(false)
    setFinished(false)
    setSpinning(true)

    const tIdx = randomIndex(terms.length)
    // Map eligible student index to original array index for wheel display consistency
    const eligibleIndices = eligibleStudents.map(s => students.findIndex(x => x.id === s.id))
    const pickedEligibleIdx = randomIndex(eligibleStudents.length)
    const sIdx = eligibleIndices[pickedEligibleIdx]

    setSelectedTermIdx(tIdx)
    setSelectedStudentIdx(sIdx)

    // End spin after duration
    window.clearTimeout(endTimer.current)
    endTimer.current = window.setTimeout(() => {
      setSpinning(false)
      setFinished(true)
    }, spinDurationMs + 100) // small safety margin
  }

  function resetSpin() {
    setSpinning(false)
    setFinished(false)
    setReveal(false)
    setSelectedStudentIdx(null)
    setSelectedTermIdx(null)
  }

  function toggleStudent(id) {
    setEnabledSet(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function setAllStudents(on) {
    setEnabledSet(new Set(on ? students.map(s => s.id) : []))
  }

  const endTimer = useRef(null)
  useEffect(() => () => window.clearTimeout(endTimer.current), [])

  const selectedTerm = selectedTermIdx != null ? terms[selectedTermIdx] : null
  const selectedStudent = selectedStudentIdx != null ? students[selectedStudentIdx] : null

  return (
    <div className="app">
      <header className="app-header">
        <h1>Double Tirage au Sort</h1>
        <p className="subtitle">Un terme + un étudiant — roue spectaculaire ✨</p>
      </header>

      <main className="layout">
        <section className="wheels">
          <div className="wheel-card">
            <h2>Terme</h2>
            <Wheel
              items={terms.map(t => t.term)}
              selectedIndex={selectedTermIdx}
              spinning={spinning}
              durationMs={spinDurationMs}
              colorScheme="terms"
            />
          </div>
          <div className="wheel-card">
            <h2>Étudiant</h2>
            <Wheel
              items={students.map(s => s.name)}
              disabledIndices={students.map((s, i) => ({ i, on: enabledSet.has(s.id) })).filter(x => !x.on).map(x => x.i)}
              selectedIndex={selectedStudentIdx}
              spinning={spinning}
              durationMs={spinDurationMs}
              colorScheme="students"
            />
          </div>
        </section>

        <section className="controls">
          {finished && (
            <div className="current-selection">
              <div>
                <span className="label">Terme tiré :</span>
                <strong>{selectedTerm ? selectedTerm.term : '—'}</strong>
              </div>
              <div>
                <span className="label">Étudiant tiré :</span>
                <strong>{selectedStudent ? selectedStudent.name : '—'}</strong>
              </div>
              <div className="result-actions">
                <button className="accent" onClick={() => setReveal(true)} disabled={!selectedTerm}>Afficher la définition</button>
              </div>
            </div>
          )}
        </section>

        <section className="students">
          <div className="students-header">
            <h2>Présence des étudiants</h2>
            <div className="students-actions">
              <button onClick={() => setAllStudents(true)} disabled={spinning}>Tout cocher</button>
              <button onClick={() => setAllStudents(false)} disabled={spinning}>Tout décocher</button>
            </div>
          </div>
          <ul className="student-list">
            {students.map((s) => (
              <li key={s.id} className={!enabledSet.has(s.id) ? 'disabled' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={enabledSet.has(s.id)}
                    onChange={() => toggleStudent(s.id)}
                    disabled={spinning}
                  />
                  <span>{s.name}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="students-footer">
            <button className="giant primary" onClick={startSpin} disabled={!canSpin}>Lancer la roue</button>
            <button className="giant" onClick={resetSpin} disabled={spinning && !finished}>Réinitialiser</button>
          </div>
        </section>

      </main>

      <footer className="app-footer">

      </footer>

      {finished && (
        <div className="confetti" aria-hidden />
      )}

      {reveal && selectedTerm && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setReveal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Définition</h3>
              <button className="icon" onClick={() => setReveal(false)} aria-label="Fermer">✕</button>
            </div>
            <div className="modal-body">
              <div className="term">{selectedTerm.term}</div>
              <div className="def">{selectedTerm.definition}</div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setReveal(false)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
