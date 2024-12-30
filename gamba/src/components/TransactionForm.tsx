'use client'

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { addTransactionAction } from '@/lib/actions';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Transaction } from '@/types/transaction';

const bookmakers = [
  "Bet365",
  "William Hill",
  "Paddy Power",
  "Ladbrokes",
  "Betfair",
  "Unibet",
  "888sport",
  "Coral",
  "Betfred",
  "SkyBet",
  "BoyleSports",
  "BetVictor",
  "10Bet",
  "Marathonbet",
  "Betway"
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Adding...' : 'Add Transaction'}
    </Button>
  );
}

interface TransactionFormProps {
  onNewTransaction: (data: { transactions: Transaction[], monthlyIncome: { [key: string]: number }, overallIncome: number }) => void;
}

export default function TransactionForm({ onNewTransaction }: TransactionFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date())

  async function action(formData: FormData) {
    const result = await addTransactionAction(formData);
    onNewTransaction(result);
    formRef.current?.reset();
    setValue("");
    setDate(new Date());
  }

  const filteredBookmakers = value 
    ? bookmakers.filter((bookmaker) =>
        bookmaker.toLowerCase().includes(value.toLowerCase())
      )
    : bookmakers;

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <input 
          type="hidden" 
          name="date" 
          value={date ? format(date, 'yyyy-MM-dd') : ''}
        />
      </div>
      <div>
        <Label htmlFor="bookmaker">Bookmaker</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value || "Select bookmaker..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search bookmaker..." value={value} onValueChange={setValue} />
              <CommandList>
              <CommandEmpty>No bookmaker found. Type to add custom.</CommandEmpty>
              <CommandGroup>
                {filteredBookmakers.map((bookmaker) => (
                  <CommandItem
                    key={bookmaker}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {bookmaker}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value.toLowerCase() === bookmaker.toLowerCase() ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <input 
          type="hidden" 
          name="bookmaker" 
          value={bookmakers.includes(value) ? value : value ? `Custom: ${value}` : ""}
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount (positive for wins, negative for losses)</Label>
        <Input type="number" id="amount" name="amount" step="0.01" required />
      </div>
      <SubmitButton />
    </form>
  );
}

