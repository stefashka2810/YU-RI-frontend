'use client'
import Image from 'next/image';
import { useState, DragEvent, useEffect, useRef } from 'react';
import mammoth from 'mammoth';

/* eslint-disable @next/next/no-img-element */

interface DocumentEditorProps {
    file: File | null;
    onClose: () => void;
    onFileSelect: (file: File) => void;
}


export const Editor = () => {
    const [fontSize, setFontSize] = useState('3');
    const [fontFamily, setFontFamily] = useState('Montserrat');
    const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
    const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
    const fontDropdownRef = useRef<HTMLDivElement>(null);
    const sizeDropdownRef = useRef<HTMLDivElement>(null);

    const fontOptions = ['Montserrat', 'Arial', 'Times New Roman'];
    const sizeOptions = [
        { value: '1', label: '10' },
        { value: '2', label: '12' },
        { value: '3', label: '14' },
        { value: '4', label: '16' },
        { value: '5', label: '18' },
        { value: '6', label: '20' },
        { value: '7', label: '24' }
    ];

    // Обработчик для форматирования
    const handleFormat = (command: string, value?: string) => {
        document.execCommand(command, false, value);
    };

    // Закрытие dropdown'ов при клике вне их области
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (fontDropdownRef.current && !fontDropdownRef.current.contains(event.target as Node)) {
                setIsFontDropdownOpen(false);
            }
            if (sizeDropdownRef.current && !sizeDropdownRef.current.contains(event.target as Node)) {
                setIsSizeDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex flex-col ml-[0.5vw] mt-[1.3vw] w-[13.5vw] h-[7vw] bg-transparent'>
            {/* Панель инструментов */}
            <div className='flex flex-col gap-[0.5vw] p-[1vw] '>
                {/* Первая строка: шрифт и размер */}
                <div className='flex flex-row gap-[0.5vw]'>
                    {/* Кастомный селект для шрифта */}
                    <div className='relative' ref={fontDropdownRef}>
                        <button
                            onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                            className='bg-transparent border border-[#FFFFFFCC] rounded-[4px] text-white px-[0.1vw] py-[0.2vw] text-[0.8vw] min-w-[10vw] text-left flex justify-between items-center'
                        >
                            <span>{fontFamily}</span>
                            <span className='text-[0.6vw]'>▼</span>
                        </button>
                        {isFontDropdownOpen && (
                            <div className='absolute top-full left-0 w-full bg-black border border-[#FFFFFFCC] rounded-[4px] mt-[0.1vw] z-10'>
                                {fontOptions.map((font) => (
                                    <button
                                        key={font}
                                        onClick={() => {
                                            setFontFamily(font);
                                            handleFormat('fontName', font);
                                            setIsFontDropdownOpen(false);
                                        }}
                                        className='w-full text-left text-white px-[0.1vw] py-[0.2vw] text-[0.8vw] hover:bg-[#FFFFFF1A] hover:cursor-pointer'
                                    >
                                        {font}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Кастомный селект для размера */}
                    <div className='relative' ref={sizeDropdownRef}>
                        <button
                            onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                            className='bg-transparent border border-[#FFFFFFCC] rounded-[4px] text-white px-[0.1vw] py-[0.2vw] text-[0.8vw] min-w-[2.5vw] text-left flex justify-between items-center'
                        >
                            <span>{sizeOptions.find(s => s.value === fontSize)?.label}</span>
                            <span className='text-[0.6vw]'>▼</span>
                        </button>
                        {isSizeDropdownOpen && (
                            <div className='absolute top-full left-0 w-full bg-black border border-[#FFFFFFCC] rounded-[4px] mt-[0.1vw] z-10'>
                                {sizeOptions.map((size) => (
                                    <button
                                        key={size.value}
                                        onClick={() => {
                                            setFontSize(size.value);
                                            handleFormat('fontSize', size.value);
                                            setIsSizeDropdownOpen(false);
                                        }}
                                        className='w-full text-left text-white px-[0.1vw] py-[0.2vw] text-[0.8vw] hover:bg-[#FFFFFF1A] hover:cursor-pointer'
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Вторая строка: форматирование текста */}
                <div className='flex flex-row gap-[0.5vw]'>
                    <div className='flex flex-row border border-white rounded-[4px]'>
                        <button onClick={() => handleFormat('bold')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/bold.svg' alt='bold' className='w-full h-full object-contain'/>
                            </div>
                        </button>
                        <button onClick={() => handleFormat('italic')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/italic.svg' alt='italic' className='w-full h-full object-contain' />
                            </div>
                        </button>
                        <button onClick={() => handleFormat('underline')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/underline.svg' alt='underline' className='w-full h-full object-contain' />
                            </div>
                        </button>
                        <button onClick={() => handleFormat('strikeThrough')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/strikethrough.svg' alt='strikethrough' className='w-full h-full object-contain' />
                            </div>
                        </button>
                        <button onClick={() => handleFormat('removeFormat')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A]'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/type.svg' alt='type' className='w-full h-full object-contain' />
                            </div>
                        </button>
                    </div>
                    <div className='flex flex-row border border-white rounded-[4px]'>
                            <button onClick={() => handleFormat('justifyLeft')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                                <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                    <img src='/editorImages/align-left.svg' alt='indentLeft' className='w-full h-full object-contain' />
                                </div>
                            </button>
                            <button onClick={() => handleFormat('justifyCenter')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                                <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                    <img src='/editorImages/align-center.svg' alt='indentRight' className='w-full h-full object-contain' />
                                </div>
                            </button>
                            <button onClick={() => handleFormat('justifyRight')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A]'>
                                <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                    <img src='/editorImages/align-right.svg' alt='indent' className='w-full h-full object-contain' />
                                </div>
                            </button>
                    </div>
                </div>

                {/* Третья строка: дополнительные функции */}
                <div className='flex flex-row gap-[0.5vw]'>
                    <div className='flex flex-row border border-white rounded-[4px]'>
                        <button onClick={() => handleFormat('insertUnorderedList')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/list.svg' alt='list' className='w-full h-full object-contain' />
                            </div>
                        </button>
                        <button onClick={() => handleFormat('insertOrderedList')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A]'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/numberedList.svg' alt='numberedList' className='w-full h-full object-contain'/>
                            </div>
                        </button>
                    </div>

                    <div className='flex flex-row border border-white rounded-[4px]'>
                        <button onClick={() => {
                            const url = prompt('Введите URL:');
                            if (url) handleFormat('createLink', url);
                        }} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/link-2.svg' alt='link' className='w-full h-full object-contain' />
                            </div>
                        </button>
                        <button onClick={() => {
                            const url = prompt('Введите URL изображения:');
                            if (url) handleFormat('insertImage', url);
                        }} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/image.svg' alt='image' className='w-full h-full object-contain' />
                            </div>
                        </button>
                        <button onClick={() => handleFormat('insertHorizontalRule')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                                <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/youtube.svg' alt='youtube' className='w-full h-full object-contain' />
                            </div>
                        </button>
                        <button onClick={() => handleFormat('formatBlock', 'pre')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A]'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/code.svg' alt='code' className='w-full h-full object-contain' />
                            </div>
                        </button>
                    </div>

                    <div className='flex flex-row border border-white rounded-[4px]'>
                        <button onClick={() => handleFormat('superscript')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A] border-r border-white'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/S2.svg' alt='superscript' className='w-full h-full object-contain' />
                            </div>
                        </button>
                        <button onClick={() => handleFormat('subscript')} className='w-[1.5vw] h-[1.5vw] flex items-center justify-center hover:bg-[#FFFFFF1A]'>
                            <div className='w-[1vw] h-[1vw] flex items-center justify-center'>
                                <img src='/editorImages/S2 (1).svg' alt='subscript' className='w-full h-full object-contain' />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            
        </div>
    );
}

const DocumentEditor = ({ file, onFileSelect }: DocumentEditorProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [docxHtml, setDocxHtml] = useState<string | null>(null);

    // Создаем URL для просмотра файла
    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setFileUrl(url);

            // Если это DOCX, конвертируем в HTML с помощью mammoth
            if (file.name.endsWith('.docx')) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const arrayBuffer = e.target?.result as ArrayBuffer;
                    try {
                        const result = await mammoth.convertToHtml({ arrayBuffer });
                        setDocxHtml(result.value);
                    } catch (error) {
                        console.error('Ошибка при чтении DOCX:', error);
                    }
                };
                reader.readAsArrayBuffer(file);
            }

            return () => {
                URL.revokeObjectURL(url);
                setFileUrl(null);
                setDocxHtml(null);
            };
        }
    }, [file]);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            onFileSelect(droppedFile);
        }
    };


    return (
        <div className="w-full h-full bg-[#FFFFFF33] flex flex-col overflow-hidden rounded-[10px]">
            
            {/* Контент документа */}
            <div className="flex-1 overflow-hidden">
                {file ? (
                    // Если файл прикреплен - показываем его
                    <div className="w-full h-full">
                        {file.name.endsWith('.docx') && docxHtml ? (
                            // DOCX - отображаем конвертированный HTML с возможностью редактирования
                            <div className="w-full h-full overflow-auto bg-white rounded-[10px] p-[2vw]">
                                <div 
                                    className="text-black prose prose-sm max-w-none outline-none"
                                    contentEditable
                                    dangerouslySetInnerHTML={{ __html: docxHtml }}
                                    style={{
                                        fontSize: '0.9vw',
                                        lineHeight: '1.6',
                                    }}
                                    suppressContentEditableWarning
                                />
                            </div>
                        ) : file.name.endsWith('.doc') ? (
                            // DOC (старый формат) - показываем через iframe
                            <div className="w-full h-full flex flex-col">
                                <iframe
                                    src={fileUrl || ''}
                                    className="w-full h-full rounded-[10px] bg-white"
                                    title={file.name}
                                />
                            </div>
                        ) : (
                            // Для других файлов показываем информацию
                            <div className="w-full h-full flex flex-col items-center justify-center gap-[1vw] text-white bg-[#0A0A0A] rounded-[10px]">
                                <Image 
                                    src='/chatImages/FileIcon.png' 
                                    alt='file' 
                                    width={80} 
                                    height={80}
                                />
                                <p className="text-[1vw] font-medium">{file.name}</p>
                                <p className="text-[0.8vw] text-gray-400">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                                <p className="text-[0.75vw] text-gray-500 mt-[1vw] text-center max-w-[80%]">
                                    Файл готов к отправке
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    // Если файла нет - показываем дроп-зону
                    <div className="w-full h-full p-[1.5vw]">
                        <div 
                            className={`w-full h-full flex flex-col items-center justify-center rounded-[15px] transition-colors ${
                                isDragging 
                                    ? 'bg-[#FFFFFF0A]' 
                                    : 'border-[#FFFFFF33] hover:border-[#FFFFFF66]'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            
                            <p className="text-[#FFFFFFCC] text-[1vw] mt-[1.5vw]">
                                Выберите документ или прикрепите его сюда
                            </p>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default DocumentEditor;
